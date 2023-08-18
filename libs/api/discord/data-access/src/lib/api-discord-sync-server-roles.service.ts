import { Injectable, Logger } from '@nestjs/common'
import { Cron } from '@nestjs/schedule'
import { Asset, AssetAttribute, Identity, IdentityProvider, User } from '@prisma/client'
import { parseAttributes } from '@pubkey-link/api/asset/util'
import { ApiCoreService } from '@pubkey-link/api/core/data-access'
import { env } from 'node:process'
import { ApiDiscordBotService } from './api-discord-bot.service'

type IdentityAssets = { identity: Identity; assets: Asset[] }

type AssetWithIdentity = Asset & { identity: null | (Identity & { owner: User & { identities: Identity[] } }) }

@Injectable()
export class ApiDiscordSyncServerRolesService {
  private readonly logger = new Logger(ApiDiscordSyncServerRolesService.name)

  constructor(private readonly core: ApiCoreService, private readonly bot: ApiDiscordBotService) {}

  @Cron(env['SYNC_ALL_DISCORD_SERVER_ROLES'] as string)
  async syncAllDiscordServerRoles() {
    if (!this.core.config.syncActive) {
      this.logger.verbose(`syncAllDiscordServerRoles: syncActive is false, skipping`)
      return
    }
    // We are only interested in servers that are connected to the bot
    const connectedServers = await this.bot.client.guilds.fetch()
    // Get the ids of the connected servers
    const connectedServerIds: string[] = connectedServers.map((s) => s.id)

    // Loop through the servers
    for (const serverId of connectedServerIds) {
      await this.syncDiscordServerRoles(serverId)
    }
  }

  async syncDiscordServerRoles(serverId: string) {
    // Get the server from the database, with their roles and conditions
    const server = await this.core.data.discordServer.findUnique({
      where: { id: serverId },
      include: {
        roles: {
          where: { conditions: { some: {} } },
          orderBy: { position: 'desc' },
          include: {
            conditions: {
              include: {
                collections: true,
                combos: { include: { attributes: true } },
              },
            },
          },
        },
      },
    })

    if (!server) {
      this.logger.warn(`SyncDiscordRoles => Server ${serverId} not found`)
      return
    }

    if (!server.enableSync) {
      this.logger.verbose(`SyncDiscordRoles => [${server.name}] Sync is disabled for this server`)
      return
    }

    // Loop through the servers
    const tag = `SyncDiscordRoles [${server.name}]`

    // Get the ids of the members of the server
    const [identityProviderIds, discordMemberIds] = await Promise.all([
      this.getDiscordProviderIds(),
      this.bot.getDiscordGuildMemberIds(server.id),
    ])

    // Make sure we only look at members that are connected to the bot and in our database
    const filteredProviderIds = discordMemberIds.filter((id) => identityProviderIds.includes(id))

    // Bail if there are no members
    if (!filteredProviderIds.length) {
      await this.debugLog(
        `${tag} => [${server.name}] -> No members found to sync (found ${discordMemberIds.length} members and ${identityProviderIds.length} identities)`,
      )
      return
    }

    const identities = await this.core.data.identity.findMany({
      where: { providerId: { in: filteredProviderIds } },
      include: { owner: { include: { identities: { where: { provider: IdentityProvider.Solana } } } } },
    })

    // Get a list of all the solana account ids
    const solanaAccountIds: string[] = identities.reduce((acc, curr) => {
      acc.push(...curr.owner.identities.map((i) => i.providerId))
      return acc
    }, [] as string[])

    // Get the roles from the server that have conditions
    const filteredRoles = server.roles.filter((r) => r.conditions?.length) ?? []

    // Bail if there are no roles
    if (!filteredRoles.length) {
      await this.debugLog(`${tag} => [${server.name}] -> No roles found to sync for server ${server.name}`)
      return
    }

    for (const filteredProviderId of filteredProviderIds) {
      const discordMember = discordMemberIds.find((m) => m === filteredProviderId)
      if (!discordMember) {
        await this.debugLog(`${tag} 👀 -> Member ${filteredProviderId} not found`)
      } else {
        const roles = filteredRoles.map((r) => r.name)
        await this.debugLog(`${tag} 👀 -> Member ${JSON.stringify(discordMember, null, 2)} found: ${roles.join(', ')} `)
      }
    }

    await this.debugLog(
      `${tag} -> Syncing ${filteredProviderIds.length} members with ${filteredRoles?.length} roles`,
      true,
    )

    // Loop through the roles
    for (const role of filteredRoles) {
      // Filter out conditions that don't have collections or combos
      const filtered = role.conditions.filter((c) => c.collections?.length || c.combos?.length)

      if (!filtered.length) {
        // No conditions with collections or combos
        await this.debugLog(`${tag} -> No conditions with collections or combos for role ${role.name}`)
        continue
      }

      await this.debugLog(
        `${tag} -> Syncing role ${role.name}, ${filtered.length} conditions with collections or combos`,
      )

      // Loop through the conditions
      for (const condition of filtered) {
        this.logger.verbose(`${tag} => [${role.name}]   -> Syncing condition ${condition.id}`)

        const collections = condition.collections ?? []
        const combos = condition.combos ?? []

        let found: AssetWithIdentity[] = []

        // If there are combos, we need to get the assets with the attributes
        if (combos.length) {
          for (const combo of combos) {
            const result = await this.getAssetsWithAttributes(combo.attributes, solanaAccountIds)
            found = found.concat(result as AssetWithIdentity[])
            await this.debugLog(`${tag} => [${role.name}]   -> Syncing combo ${combo.id}, found ${found.length} assets`)
          }
          // If there are no combos, we can just get the assets with the collections
        } else {
          for (const collection of collections) {
            const result = await this.getAssetsWithCollection(collection.account, solanaAccountIds)
            found = found.concat(result)
            await this.debugLog(
              `${tag} => [${role.name}]   -> Syncing collection ${collection.account}, found ${found.length} assets`,
            )
          }
        }

        if (!found.length) {
          await this.debugLog(`${tag} => [${role.name}]   -> No assets found, skipping`)
          continue
        }

        const assetsByOwner: IdentityAssets[] = []

        await this.debugLog(`${tag} => [${role.name}]   -> Found ${found.length} assets, grouping by owner`)

        for (const asset of found) {
          const discordIdentity = asset.identity?.owner.identities.find(
            (i) => i.provider === IdentityProvider.Discord && filteredProviderIds.includes(i.providerId),
          )
          if (!discordIdentity) {
            await this.debugLog(
              `${tag} => [${role.name}]   -> Owner of Asset ${asset.id} has no discord identity, or is not in the server ${server.name}, skipping`,
            )
            continue
          }
          const found = assetsByOwner.find((a) => a.identity.id === discordIdentity.id)
          if (found) {
            found.assets.push(asset)
          } else {
            assetsByOwner.push({ identity: discordIdentity, assets: [asset] })
          }
        }

        for (const owner of assetsByOwner) {
          await this.debugLog(
            `${tag} => [${role.name}]   -> Owner ${owner.identity.providerId} has ${owner.assets.length} assets`,
          )
          await this.bot.addRoleToUser(server, role, owner.identity.providerId)
        }
      }
    }
    await this.debugLog(`${tag} => [${server.name}] -> Sync complete`, true)
  }

  private async debugLog(message: string, always = false) {
    if (!this.core.config.syncDebug && !always) return
    this.logger.debug(message)
    await this.bot.sendCommandChannel(`\`${new Date().toISOString()}${always ? '' : ' DEBUG'}: ${message}\``)
  }

  private getAssetsWithAttributes(attributes: AssetAttribute[], providerIds: string[]): Promise<AssetWithIdentity[]> {
    return this.core.data.asset.findMany({
      where: {
        ...parseAttributes(attributes),
        identityId: { in: providerIds },
        identityProvider: { not: null },
      },
      include: { identity: { include: { owner: { include: { identities: true } } } } },
    })
  }

  private getAssetsWithCollection(collectionAccount: string, providerIds: string[]): Promise<AssetWithIdentity[]> {
    return this.core.data.asset.findMany({
      where: {
        collectionAccount,
        identityId: { in: providerIds },
        identityProvider: { not: null },
      },
      include: { identity: { include: { owner: { include: { identities: true } } } } },
    })
  }

  private async getDiscordProviderIds() {
    return this.core.data.identity
      .findMany({ where: { provider: IdentityProvider.Discord } })
      .then((identities) => identities.map((i) => i.providerId))
  }
}
