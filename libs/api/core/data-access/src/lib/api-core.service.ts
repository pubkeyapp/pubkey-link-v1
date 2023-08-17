import { Injectable } from '@nestjs/common'
import { IdentityProvider, NetworkType, UserRole, UserStatus } from '@prisma/client'
import { hasher } from 'node-object-hash'
import { ApiCoreConfigService } from './api-core-config.service'
import { ApiCoreDataService } from './api-core-data.service'
import { CollectionMap } from './entity/collection-map'

@Injectable()
export class ApiCoreService {
  readonly hasher = hasher({ sort: true, coerce: false })
  constructor(readonly config: ApiCoreConfigService, readonly data: ApiCoreDataService) {}

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

  async getProviderCollectionMap(provider: IdentityProvider): Promise<CollectionMap> {
    return this.data.collection.findMany({ where: { network: { in: getNetworks(provider) } } }).then((res) => {
      return res.reduce((acc, { network, account }) => {
        return {
          ...acc,
          [network]: [...(acc[network] || []), account],
        }
      }, {} as Record<NetworkType, string[]>)
    })
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
