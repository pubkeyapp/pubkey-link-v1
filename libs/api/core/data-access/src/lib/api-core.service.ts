import { Injectable, Logger } from '@nestjs/common'
import { IdentityProvider, NetworkType, Prisma, UserRole, UserStatus } from '@prisma/client'
import { hasher } from 'node-object-hash'
import { ApiCoreConfigService } from './api-core-config.service'
import { ApiCorePrismaClient, prismaClient } from './api-core-prisma-client'

@Injectable()
export class ApiCoreService {
  readonly data: ApiCorePrismaClient = prismaClient
  readonly hasher = hasher({ sort: true, coerce: false })
  private readonly logger = new Logger(ApiCoreService.name)
  constructor(readonly config: ApiCoreConfigService) {}

  async ensureCollection(collectionId: string) {
    const item = await this.getCollectionById(collectionId)

    if (!item) {
      throw new Error('Collection not found')
    }
    return item
  }

  async ensureUser(userId: string) {
    const item = await this.getUserById(userId)

    if (!item) {
      throw new Error('Unauthorized: No such user')
    }
    return item
  }

  async ensureUserActive(userId: string) {
    const item = await this.ensureUser(userId)

    if (item.status !== UserStatus.Active) {
      throw new Error('Unauthorized: Not an active user')
    }
    return item
  }

  async ensureUserAdmin(userId: string) {
    const user = await this.ensureUserActive(userId)

    if (user.role !== UserRole.Admin) {
      throw new Error('Unauthorized: Not an admin')
    }
    return user
  }

  async getUserRole(userId: string): Promise<UserRole> {
    const user = await this.ensureUserActive(userId)

    return user.role
  }

  async isUserAdmin(userId: string): Promise<boolean> {
    const role = await this.getUserRole(userId)

    return role === UserRole.Admin
  }

  getCollectionById(userId: string) {
    return this.data.collection.findUnique({ where: { id: userId }, include: { combos: true } })
  }

  private getUserById(userId: string) {
    return this.data.user.findUnique({ where: { id: userId }, include: { emails: true, identities: true } })
  }

  uptime() {
    return process.uptime()
  }

  getUserByProviderId(provider: IdentityProvider, providerId: string) {
    return this.data.user.findFirst({
      where: { identities: { some: { provider, providerId } } },
      include: {
        identities: {
          select: { providerId: true, provider: true, assets: { include: { collection: true } } },
        },
      },
    })
  }

  async getProviderCollectionMap(provider: IdentityProvider): Promise<Record<NetworkType, string[]>> {
    return this.data.collection.findMany({ where: { network: { in: getNetworks(provider) } } }).then((res) => {
      return res.reduce((acc, { network, account }) => {
        return {
          ...acc,
          [network]: [...(acc[network] || []), account],
        }
      }, {} as Record<NetworkType, string[]>)
    })
  }

  upsertDiscordServer({ id, name, icon }: { id: string; name: string; icon: string }) {
    return this.data.discordServer.upsert({ where: { id }, create: { id, name, icon }, update: { name, icon } })
  }

  async upsertDiscordRoles(serverId: string, roles: Prisma.DiscordRoleCreateWithoutServerInput[]) {
    const existing = await this.data.discordRole.findMany({ where: { serverId } })
    const toDelete = existing.filter((role) => !roles.find((r) => r.id === role.id))
    const toCreate = roles.filter((role) => !existing.find((r) => r.id === role.id))
    const toUpdate = roles.filter((role) => existing.find((r) => r.id === role.id))

    if (toDelete.length > 0) this.logger.verbose(`Deleting ${toDelete.length} roles`)
    await this.data.discordRole.deleteMany({ where: { id: { in: toDelete.map((r) => r.id) } } })

    for (const role of toCreate) {
      this.logger.verbose(`Creating role ${role.name} (${role.id})`)
      await this.data.discordRole.create({ data: { ...role, server: { connect: { id: serverId } } } })
    }

    await Promise.all(
      toUpdate.map((role) => {
        this.logger.verbose(`Updating role ${role.name} (${role.id})`)
        return this.data.discordRole.update({
          where: { id: role.id },
          data: { ...role },
        })
      }),
    )
    this.logger.verbose(`Synced ${roles.length} roles`)
  }
}

function getNetworks(provider: IdentityProvider): NetworkType[] {
  switch (provider) {
    case IdentityProvider.Solana:
      return [NetworkType.SolanaMainnet]
    default:
      throw new Error(`Provider ${provider} not supported`)
  }
}
