import { Injectable, Logger } from '@nestjs/common'
import { Identity, NetworkType, Prisma } from '@prisma/client'
import { ApiCoreService, CollectionMap, CollectionMapItem } from '@pubkey-link/api/core/data-access'
import {
  fetchStakedTokens,
  getAttributeMap,
  GetCollectionAssetsOptions,
  HeliusClient,
} from '@pubkey-link/api/network/util'
import { DAS } from 'helius-sdk'
import { LRUCache } from 'lru-cache'
import { ApiNetworkAdminService } from './api-network-admin.service'
import { convertNetworkType } from './helpers/convert-network-type'
import { initializeNetworkAssetMap } from './helpers/initialize-network-asset-map'

type VaultAssets = { account: string; assets: DAS.GetAssetResponse[] }
@Injectable()
export class ApiNetworkService {
  private readonly logger = new Logger(ApiNetworkService.name)
  private readonly clients = new Map<NetworkType, HeliusClient>()
  private readonly vaultCache = new LRUCache<string, VaultAssets[]>({
    max: 100,
    ttl: 1000 * 60 * 60,
  })
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

  async getOwnedAndStakedAssets({
    collectionMap,
    ownerAccount,
    identity,
  }: {
    collectionMap: CollectionMap
    ownerAccount: string
    identity?: Identity
  }): Promise<Record<NetworkType, Prisma.AssetCreateInput[]>> {
    const networks = Object.keys(collectionMap) as NetworkType[]
    const assets = initializeNetworkAssetMap(networks)
    const [owned, staked] = await Promise.all([
      this.getOwnedAssets({ collectionMap, ownerAccount, identity }),
      this.getStakedAssets({ collectionMap, ownerAccount, identity }),
    ])

    for (const network of networks) {
      assets[network] = [...owned[network], ...staked[network]]
    }

    return assets
  }

  async getOwnedAssets({
    collectionMap,
    ownerAccount,
    identity,
  }: {
    collectionMap: CollectionMap
    ownerAccount: string
    identity?: Identity
  }): Promise<Record<NetworkType, Prisma.AssetCreateInput[]>> {
    const tag = `getOwnedAssets ${ownerAccount} ->`
    const networks = Object.keys(collectionMap) as NetworkType[]
    const assets = initializeNetworkAssetMap(networks)

    this.logger.verbose(`${tag} Getting assets...`)

    for (const network of networks) {
      const collectionAccounts = collectionMap[network].map((c) => c.account)
      assets[network] = await this.getCollectionAccounts(network, { ownerAccount, identity, collectionAccounts })
    }

    return assets
  }

  async getStakedAssets({
    collectionMap,
    ownerAccount,
    identity,
  }: {
    collectionMap: CollectionMap
    ownerAccount: string
    identity?: Identity
  }): Promise<Record<NetworkType, Prisma.AssetCreateInput[]>> {
    const tag = `getStakedAssets ${ownerAccount} ->`

    // We only support staked assets on Solana Mainnet
    if (!collectionMap[NetworkType.SolanaMainnet]) {
      this.logger.verbose(`${tag} No Solana Mainnet collections found, skipping`)
      return {
        [NetworkType.SolanaDevnet]: [],
        [NetworkType.SolanaMainnet]: [],
      }
    }
    const stakedCollectionMap = { [NetworkType.SolanaMainnet]: collectionMap[NetworkType.SolanaMainnet] }
    const networks = Object.keys(stakedCollectionMap) as NetworkType[]
    const assets = initializeNetworkAssetMap(networks)

    // Get all assets from the collection vaults
    const collectionVaultAssets: Record<string, VaultAssets[]> = await this.getCollectionVaults(
      collectionMap[NetworkType.SolanaMainnet].filter((c) => !!c.vaultId),
    )

    // Find the assets from the vault for this owner
    const vaultAssetsOwner: VaultAssets[] = []
    for (const vaultAssets of Object.values(collectionVaultAssets)) {
      const owned = vaultAssets.find((v) => v.account === ownerAccount)
      if (owned) {
        vaultAssetsOwner.push(owned)
      }
    }

    if (!vaultAssetsOwner || !vaultAssetsOwner?.length) {
      this.logger.verbose(`${tag} Account ${ownerAccount} has no assets found in any vaults`)
      return assets
    }

    this.logger.verbose(`${tag} Getting assets...`)
    const collectionAccounts = stakedCollectionMap['SolanaMainnet'].map((c) => c.account)
    assets['SolanaMainnet'] = await this.getStakedAccounts(
      'SolanaMainnet',
      vaultAssetsOwner.map((v) => v.assets).flat(),
      {
        ownerAccount,
        identity,
        collectionAccounts,
      },
    )

    return assets
  }

  async getCollectionVaults(items: CollectionMapItem[]): Promise<Record<string, VaultAssets[]>> {
    const vaults: Record<string, VaultAssets[]> = {}
    for (const item of items) {
      if (!item.vaultId) {
        continue
      }
      const vaultAssets = await this.getVaultAssets(item.vaultId)
      if (!vaultAssets?.length) {
        this.logger.verbose(`getCollectionVaults: No vaults found for ${item.vaultId}`)
        continue
      }
      vaults[item.account] = vaultAssets
    }
    return vaults
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
  private async getStakedAccounts(
    network: NetworkType,
    assets: DAS.GetAssetResponse[],
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
    const tag = `getStakedAccounts ${network} ${ownerAccount} ->`
    const filtered = assets.filter(
      (asset) =>
        !!asset.grouping?.find((g) => g.group_key === 'collection' && collectionAccounts.includes(g.group_value)),
    )

    if (!filtered.length) {
      this.logger.verbose(`${tag} No assets found for ${network} -> ${ownerAccount}`)
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

  async getVaultAssets(vaultId: string) {
    if (!this.vaultCache.has(vaultId)) {
      const client = await this.ensureClient('SolanaMainnet')
      this.logger.verbose(`getVaultAssets: Fetching vault ${vaultId}...`)
      const result = await fetchStakedTokens(vaultId)
        .then(async (res) => {
          // Fetch assets for all staked mints
          const data = await client.getAssets(res.map((item) => item.mints).flat())
          // Map staked mints back to their owners
          return res.map((item) => ({
            account: item.account,
            assets: data.filter((asset: { id: string }) => item.mints.includes(asset.id)),
          }))
        })
        .catch((err) => {
          console.log(`Error fetching vault ${vaultId}`, err)
        })
      if (!result) {
        this.logger.warn(`getVaultAssets: Vault ${vaultId} not found`)
        return
      }
      this.vaultCache.set(vaultId, result)
    }
    return this.vaultCache.get(vaultId)
  }
}
