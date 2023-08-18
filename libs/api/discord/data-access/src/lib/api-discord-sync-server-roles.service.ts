import { Injectable, Logger } from '@nestjs/common'
import { Cron } from '@nestjs/schedule'
import { Asset, AssetAttribute, Identity, IdentityProvider, User } from '@prisma/client'
import { parseAttributes } from '@pubkey-link/api/asset/util'
import { ApiCoreService } from '@pubkey-link/api/core/data-access'
import { GuildMember } from 'discord.js'
import { env } from 'node:process'
import { ApiDiscordBotService } from './api-discord-bot.service'
import { FilteredRole, FilteredRoleCondition } from './entity/filtered-role-types'
import { getRoleMap } from './helpers/get-role-map'
import { getUsernameMap } from './helpers/get-username-map'
import { initializeUserRoleMap } from './helpers/initialize-user-role-map'
import { processUserRoleMap } from './helpers/process-user-role-map'

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
    // Get the server
    const server = await this.getDiscordServer(serverId)

    if (!server) {
      return
    }

    const tag = `SyncDiscordRoles [${server.name}]`

    // Get all the roles for the server
    const roles = await this.getFilteredRoles(server.id)

    // Bail if there are no roles
    if (!roles.length) {
      await this.bot.debugLog(`${tag} => No roles found to sync for this server`)
      return
    }

    // Get the members of the server
    const [identityProviderIds, discordMembers] = await Promise.all([
      this.getDiscordProviderIds(),
      this.bot.getDiscordGuildMembers(server.id),
    ])

    const discordMemberIds = discordMembers.map((m) => m.id)

    // Make sure we only look at members that are connected to the bot and in our database
    const filteredProviderIds = discordMemberIds.filter((id) => identityProviderIds.includes(id))

    // Bail if there are no members
    if (!filteredProviderIds.length) {
      await this.bot.debugLog(
        `${tag} => No members found to sync (found ${discordMemberIds.length} members and ${identityProviderIds.length} identities)`,
      )
      return
    }

    // Get the solana accounts for the filtered members
    const solanaAccountIds: string[] = await this.getSolanaIdsFromDiscordIds(filteredProviderIds)

    await this.bot.debugLog(`${tag} -> Syncing ${filteredProviderIds.length} members with ${roles?.length} roles`, true)

    // Map of user roles they have, need and should be removed
    const userRoleMap = initializeUserRoleMap(
      discordMembers,
      roles.map((r) => r.id),
    )

    // Loop through the roles
    for (const role of roles) {
      const conditions: FilteredRoleCondition[] = role.conditions ?? []

      if (!conditions.length) {
        // No conditions with collections or combos
        await this.bot.debugLog(`${tag} -> No conditions with collections or combos for role ${role.name}`)
        continue
      }

      await this.bot.debugLog(
        `${tag} -> Syncing role ${role.name}, ${conditions.length} conditions with collections or combos`,
      )

      // Loop through the conditions
      for (const condition of conditions) {
        this.logger.verbose(`${tag} => [${role.name}]   -> Syncing condition ${condition.id}`)

        const collections = condition.collections ?? []
        const combos = condition.combos ?? []

        let found: AssetWithIdentity[] = []

        // If there are combos, we need to get the assets with the attributes
        if (combos.length) {
          for (const combo of combos) {
            const result = await this.getAssetsWithAttributes(combo.attributes, solanaAccountIds)
            found = found.concat(result as AssetWithIdentity[])
            await this.bot.debugLog(
              `${tag} => [${role.name}]   -> Syncing combo ${combo.id}, found ${found.length} assets`,
            )
          }
          // If there are no combos, we can just get the assets with the collections
        } else {
          for (const collection of collections) {
            const result = await this.getAssetsWithCollection(collection.account, solanaAccountIds)
            found = found.concat(result)
            await this.bot.debugLog(
              `${tag} => [${role.name}]   -> Syncing collection ${collection.account}, found ${found.length} assets`,
            )
          }
        }

        if (!found.length) {
          await this.bot.debugLog(`${tag} => [${role.name}]   -> No assets found, skipping`)
          continue
        }

        const assetsByOwner: IdentityAssets[] = []

        await this.bot.debugLog(`${tag} => [${role.name}]   -> Found ${found.length} assets, grouping by owner`)

        for (const asset of found) {
          const discordIdentity = asset.identity?.owner.identities.find(
            (i) => i.provider === IdentityProvider.Discord && filteredProviderIds.includes(i.providerId),
          )
          if (!discordIdentity) {
            await this.bot.debugLog(
              `${tag} => [${role.name}]   -> Owner of Asset ${asset.id} has no discord identity, or is not in this server, skipping`,
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
          await this.bot.debugLog(
            `${tag} => [${role.name}]   -> Owner ${owner.identity.providerId} has ${owner.assets.length} assets`,
          )

          if (!userRoleMap[owner.identity.providerId]) {
            await this.bot.debugLog(
              `${tag} => [${role.name}]   -> Adding role ${role.name} to user ${owner.identity.providerId} BUT THEY ARE NOT IN THIS SERVER WAIT WTF THIS SHOULD NOT HAPPEN 🤔`,
            )
          } else {
            userRoleMap[owner.identity.providerId].needs.push(role.id)
          }
        }
      }
    }

    const userRoleChanges = processUserRoleMap(userRoleMap)
    if (userRoleChanges.length) {
      await this.bot.debugLog(`${tag} => Syncing user roles...`, true)
      await this.bot.syncUserRoles(server, userRoleChanges, {
        userMap: getUsernameMap(discordMembers),
        roleMap: getRoleMap(roles),
      })
    } else {
      await this.bot.debugLog(`${tag} => No user role changes`, true)
    }
    await this.bot.debugLog(`${tag} => Sync complete`, true)
  }

  private async getSolanaIdsFromDiscordIds(discordIds: string[]): Promise<string[]> {
    // Get the Solana Identities for the Discord members
    const identities = await this.core.data.identity.findMany({
      where: { providerId: { in: discordIds } },
      include: { owner: { include: { identities: { where: { provider: IdentityProvider.Solana } } } } },
    })

    // Get a list of all the solana account ids for the members
    const solanaAccountIds: string[] = identities.reduce((acc, curr) => {
      acc.push(...curr.owner.identities.map((i) => i.providerId))
      return acc
    }, [] as string[])

    return solanaAccountIds ?? []
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

  private async getDiscordServer(serverId: string) {
    const server = await this.core.data.discordServer.findUnique({ where: { id: serverId } })

    if (!server) {
      this.logger.warn(`SyncDiscordRoles => Server ${serverId} not found`)
      return
    }

    if (!server.enableSync) {
      this.logger.verbose(`SyncDiscordRoles => [${server.name}] Sync is disabled for this server`)
      return
    }
    return server
  }

  private async getFilteredRoles(serverId: string): Promise<FilteredRole[]> {
    const roles = await this.core.data.discordRole.findMany({
      where: {
        serverId,
        conditions: { some: {} },
      },
      orderBy: { position: 'desc' },
      include: {
        conditions: {
          include: {
            collections: true,
            combos: { include: { attributes: true } },
          },
        },
      },
    })

    // Get the roles from the server that have conditions
    const filtered: FilteredRole[] =
      roles
        // We only want to sync roles that have conditions
        .filter((r) => r.conditions?.length)
        // We only want to sync roles that have conditions with collections or combos
        .filter((r) => r.conditions.some((c) => c.collections?.length || c.combos?.length)) ?? []

    return filtered ?? []
  }
}
