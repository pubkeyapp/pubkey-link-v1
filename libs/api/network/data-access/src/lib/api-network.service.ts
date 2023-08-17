import { Injectable, Logger } from '@nestjs/common'
import { Identity, NetworkType, Prisma } from '@prisma/client'
import { ApiCoreService } from '@pubkey-link/api/core/data-access'
import { getAttributeMap, GetCollectionAssetsOptions, HeliusClient } from '@pubkey-link/api/network/util'
import { DAS } from 'helius-sdk'
import { ApiNetworkAdminService } from './api-network-admin.service'
import { convertNetworkType } from './helpers/convert-network-type'
import { initializeNetworkAssetMap } from './helpers/initialize-network-asset-map'

@Injectable()
export class ApiNetworkService {
  private readonly logger = new Logger(ApiNetworkService.name)
  private readonly clients = new Map<NetworkType, HeliusClient>()
  constructor(private readonly core: ApiCoreService, readonly admin: ApiNetworkAdminService) {}

  private async ensureClient(network: NetworkType) {
    const client = await this.getClient(network)

    if (!client) {
      throw new Error(`Client for network ${network} not found`)
    }
    return client
  }

  private async getClient(type: NetworkType) {
    if (!this.clients.has(type)) {
      const network = await this.core.data.network.findUnique({ where: { type } })
      if (!network) {
        throw new Error(`Network ${type} not found`)
      }
      const client = new HeliusClient({
        apiKey: this.core.config.heliusApiKey as string,
        cluster: convertNetworkType(type),
      })
      this.clients.set(type, client)
    }
    return this.clients.get(type)
  }

  async getOwnedAssets({
    collectionMap,
    ownerAccount,
    identity,
  }: {
    collectionMap: Record<NetworkType, string[]>
    ownerAccount: string
    identity?: Identity
  }): Promise<Record<NetworkType, Prisma.AssetCreateInput[]>> {
    const tag = `getNetworkAssetsForIdentity ${ownerAccount} ->`
    const networks = Object.keys(collectionMap) as NetworkType[]
    const assets = initializeNetworkAssetMap(networks)

    this.logger.verbose(`${tag} Getting assets...`)

    for (const network of networks) {
      const collectionAccounts = collectionMap[network]
      assets[network] = await this.getCollectionAccounts(network, { ownerAccount, identity, collectionAccounts })
    }

    return assets
  }

  private async getCollectionAccounts(
    network: NetworkType,
    {
      ownerAccount,
      identity,
      collectionAccounts,
    }: {
      collectionAccounts: string[]
      ownerAccount: string
      identity?: Identity
    },
  ): Promise<Prisma.AssetCreateInput[]> {
    const tag = `getCollectionAccounts ${network} ${ownerAccount} ->`
    const client = await this.ensureClient(network)

    const filtered = await client.getCollectionAssetsByOwner({ ownerAccount, collectionAccounts })

    if (!filtered.length) {
      return []
    }

    this.logger.verbose(`${tag} Filtered to ${filtered.length} assets for ${network} -> ${ownerAccount}`)
    return filtered.map((asset) => this.convertDasToAsset({ network, asset, identity }))
  }

  private convertDasToAsset({
    network,
    asset,
    identity,
  }: {
    network: NetworkType
    asset: DAS.GetAssetResponse
    identity?: Identity
  }): Prisma.AssetCreateInput {
    const collectionAccount = asset.grouping?.find((g) => g.group_key === 'collection')?.group_value?.toString()

    if (!collectionAccount) {
      throw new Error(`Asset ${asset.id} has no collection`)
    }

    const { attributes, attributeMap } = getAttributeMap(asset.content?.metadata)

    return {
      account: asset.id,
      name: asset?.content?.metadata?.name ?? asset.id,
      metadata: asset.content?.metadata as unknown as Prisma.JsonObject,
      attributes: attributes,
      image: asset.content?.files?.[0]?.uri,
      attributeMap,
      owner: asset.ownership?.owner,
      identity: identity
        ? {
            connect: { provider_providerId: { provider: identity.provider, providerId: identity.providerId } },
          }
        : undefined,
      collection: { connect: { account_network: { account: collectionAccount, network } } },
      raw: asset as unknown as Prisma.JsonObject,
      rawHash: this.core.hasher.hash(asset),
    }
  }

  async getCollectionAssets(network: NetworkType, options: GetCollectionAssetsOptions) {
    const client = await this.ensureClient(network)

    return client.getCollectionAssets(options)
  }
}
