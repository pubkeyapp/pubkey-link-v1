import { Injectable, Logger } from '@nestjs/common'
import { IdentityProvider } from '@prisma/client'
import { ApiCoreService } from '@pubkey-link/api/core/data-access'
import { ApiIdentityService } from '@pubkey-link/api/identity/data-access'
import { ApiNetworkService, NetworkType } from '@pubkey-link/api/network/data-access'

@Injectable()
export class ApiDevService {
  private readonly logger = new Logger(ApiDevService.name)

  constructor(
    private readonly core: ApiCoreService,
    private readonly identity: ApiIdentityService,
    private readonly network: ApiNetworkService,
  ) {}

  async checkAccount(adminId: string, type: NetworkType, address: string) {
    await this.core.ensureUserAdmin(adminId)
    this.logger.verbose(`Checking account ${address} for ${type}`)
    const isPubKeyIdentity = await this.core.getUserByProviderId(IdentityProvider.Solana, address)
    const collectionMap = await this.core.getProviderCollectionMap(IdentityProvider.Solana)
    const assets = await this.network.getOwnedAssets({
      ownerAccount: address,
      collectionMap,
    })

    const collectionKeys = Object.keys(collectionMap) as NetworkType[]

    return {
      address,
      type,
      isPubKeyIdentity: isPubKeyIdentity ?? false,
      collectionMap: collectionKeys.map((key) => {
        return collectionMap[key]
          .map((collection) => {
            return {
              collection,
              assetCount: assets[key].filter(
                ({ collection: { connect } }) => connect?.account_network?.account === collection,
              ).length,
            }
          })
          .filter((item) => item.assetCount > 0)
      }),
    }
  }

  async checkIdentity(adminId: string, provider: IdentityProvider, providerId: string) {
    await this.core.ensureUserAdmin(adminId)
    const identity = await this.ensureIdentity({ provider, providerId })

    const collectionMap = await this.core.getProviderCollectionMap(provider)
    // const ownedAssets = await this.network.getOwnedAssets({
    //   ownerAccount: providerId,
    //   collectionMap,
    //   identity,
    // })

    await this.identity.queue.scheduleIdentitySyncOne({
      identity,
      collectionMap,
    })
    // const ownedAssetIds = ownedAssets.SolanaMainnet.map((a) => a.id)

    return {
      provider,
      providerId,
      collectionMap,
      identity,
      // ownedAssets,
    }
  }

  private async ensureIdentity({ provider, providerId }: { provider: IdentityProvider; providerId: string }) {
    const identity = await this.core.data.identity.findUnique({
      where: {
        provider_providerId: { provider, providerId },
      },
      include: {
        owner: true,
        assets: { include: { collection: true } },
      },
    })

    if (!identity) {
      throw new Error(`Identity not found for ${provider} ${providerId}`)
    }

    return identity
  }
}
