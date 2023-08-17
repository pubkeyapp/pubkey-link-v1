import { Injectable, Logger } from '@nestjs/common'
import { Identity, NetworkType, Prisma } from '@prisma/client'
import { ApiCoreService } from '@pubkey-link/api/core/data-access'
import { AssetSortBy, AssetSortDirection, DAS, Helius } from 'helius-sdk'
import { ApiNetworkAdminService } from './api-network-admin.service'
import { convertNetworkType } from './helpers/convert-network-type'

export type CollectionMap = Record<NetworkType, string[]>

export interface HandleAssetCount {
  total: number
  created: number
  skipped: number
  updated: number
}

@Injectable()
export class ApiNetworkService {
  private readonly logger = new Logger(ApiNetworkService.name)
  private readonly networks = new Map<NetworkType, Helius>()
  constructor(private readonly core: ApiCoreService, readonly admin: ApiNetworkAdminService) {}

  async ensureNetworkClient(network: NetworkType) {
    const client = await this.getNetworkClient(network)

    if (!client) {
      throw new Error(`Network ${network} not found`)
    }
    return client
  }

  private async getNetworkClient(type: NetworkType) {
    if (!this.networks.has(type)) {
      const network = await this.core.data.network.findUnique({ where: { type } })
      if (!network) {
        throw new Error(`Network ${type} not found`)
      }
      const helius = new Helius(this.core.config.heliusApiKey as string, convertNetworkType(type))
      const version = await helius.connection.getVersion()
      this.logger.verbose(`Connected to Network ${type}, running version ${version['solana-core']}`)
      this.networks.set(type, helius)
    }
    return this.networks.get(type)
  }

  private async getAssetsByGroup({
    network,
    collectionAccount,
    page = 1,
    limit = 1000,
  }: {
    network: NetworkType
    collectionAccount: string
    page?: number
    limit?: number
  }) {
    const client = await this.ensureNetworkClient(network)
    return client.rpc.getAssetsByGroup({
      groupKey: 'collection',
      groupValue: collectionAccount,
      limit,
      page,
    })
  }

  async getAssetsByOwner({
    network,
    ownerAccount,
    page = 1,
    limit = 1000,
  }: {
    network: NetworkType
    ownerAccount: string
    page?: number
    limit?: number
  }): Promise<DAS.GetAssetResponseList> {
    const client = await this.ensureNetworkClient(network)
    return client.rpc.getAssetsByOwner({
      limit,
      ownerAddress: ownerAccount,
      page,
      sortBy: { sortBy: AssetSortBy.Updated, sortDirection: AssetSortDirection.Asc },
    })
  }

  // Retrieves the assets owned by a specific account in collections on multiple clusters
  async getOwnedAssets({
    collectionMap,
    ownerAccount,
    identity,
  }: {
    collectionMap: CollectionMap
    ownerAccount: string
    identity?: Identity
  }): Promise<Record<NetworkType, Prisma.AssetCreateInput[]>> {
    const tag = `getNetworkAssetsForIdentity ${ownerAccount} ->`
    const networks = Object.keys(collectionMap) as NetworkType[]
    this.logger.verbose(`${tag} Getting assets...`)

    const assets: Record<NetworkType, Prisma.AssetCreateInput[]> = networks.reduce((acc, network) => {
      acc[network] = []
      return acc
    }, {} as Record<NetworkType, Prisma.AssetCreateInput[]>)

    for (const network of networks) {
      const result = await this.getAllAssetsByOwner({ network, ownerAccount })

      if (!result.length) {
        this.logger.debug(`${tag} no assets found, skipping...`)
        continue
      }

      this.logger.verbose(`${tag} Found ${result.length} assets for ${network} -> ${ownerAccount}, filtering...`)

      // Filter out only those that are in the collection
      const filtered = result.filter(
        (asset) =>
          !!asset.grouping?.find((g) => g.group_key === 'collection' && collectionMap[network].includes(g.group_value)),
      )

      if (!filtered.length) {
        this.logger.debug(`${tag} no assets found after filtering, skipping...`)
        continue
      }

      assets[network] = filtered.map((asset) => this.convertDasToAsset({ network, asset, identity }))
      this.logger.verbose(`${tag} Filtered to ${assets[network].length} assets for ${network} -> ${ownerAccount}`)
    }

    return assets
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
    const itemAttributes: { key: string; value: string }[] = (asset.content?.metadata?.attributes ?? []).map(
      (item) => ({ key: item.trait_type, value: item.value?.toString() }),
    )
    const attributes = itemAttributes.sort((a, b) => a.key.localeCompare(b.key))
    const attributeMap: { [key: string]: string } = attributes.reduce(
      (acc, cur) => ({
        ...acc,
        [cur.key]: cur.value,
      }),
      {},
    )

    const collectionAccount = asset.grouping?.find((g) => g.group_key === 'collection')?.group_value?.toString()

    if (!collectionAccount) {
      throw new Error(`Asset ${asset.id} has no collection`)
    }

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

  async getAllAssetsByOwner({
    network,
    ownerAccount,
  }: {
    network: NetworkType
    ownerAccount: string
  }): Promise<DAS.GetAssetResponse[]> {
    const tag = `getAllAssetsByOwner: ${network} -> ${ownerAccount}`
    const limit = 1000
    let page = 1
    let assets: DAS.GetAssetResponse[] = []

    do {
      this.logger.verbose(`${tag} Getting assets page ${page}...`)
      const result = await this.getAssetsByOwner({ network, ownerAccount, page, limit })
      if (!result.items.length) {
        this.logger.verbose(`${tag}  -> No assets found on page ${page}`)
        break
      }
      this.logger.verbose(`${tag}  -> ${result.items.length} assets found on page ${page}`)
      assets = [...assets, ...result.items]

      if (result.items.length < limit) {
        this.logger.debug(`${tag}  -> No more assets found, breaking`)
        break
      }
      page++
    } while (assets.length < limit * page)

    return assets
  }
  async getCollectionAssets(
    network: NetworkType,
    collectionId: string,
    account: string,
    cb: (items: DAS.GetAssetResponse[]) => Promise<HandleAssetCount>,
  ) {
    const startTimeMs = Date.now()
    const time = {
      totalMs: 0,
      downloadMs: 0,
      processingMs: 0,
    }
    const count: HandleAssetCount = {
      total: 0,
      created: 0,
      skipped: 0,
      updated: 0,
    }

    const tag = `getCollectionAssets: ${network} => ${account}`

    this.logger.verbose(`${tag} start`)

    let page = 1
    let done = false

    do {
      // Download the assets from the network
      const downloadStartMs = Date.now()
      this.logger.verbose(`${tag} page: ${page}, downloading... `)
      const data = await this.getAssetsByGroup({
        network,
        collectionAccount: account,
        page,
      })
      time.downloadMs = time.downloadMs + (Date.now() - downloadStartMs)
      this.logger.debug(
        `${tag} page: ${page}, ${data?.items?.length} items, downloaded in ${Date.now() - downloadStartMs}ms`,
      )

      // Bail out if there is no data
      if (!data || !data.items) {
        this.logger.warn(`${tag} no data`)
        return
      }

      // Process the assets
      // total = total + data.items.length
      this.logger.verbose(
        `${tag} page: ${page}, ${data?.items?.length} items, total: ${data.items.length} processing... `,
      )

      const processStartMs = Date.now()

      // Call into callback and update counters
      const { total, updated, skipped, created } = await cb(data?.items)
      count.total = count.total + total
      count.updated = count.updated + updated
      count.skipped = count.skipped + skipped
      count.created = count.created + created

      // Update total items
      time.processingMs = time.processingMs + (Date.now() - processStartMs)
      // this.logger.verbose(`${tag} page: ${page}, ${data?.items?.length} items, total: ${total} processed.`)
      page = page + 1
      done = data.items?.length < data.limit
    } while (!done)

    time.totalMs = Date.now() - startTimeMs

    this.logger.verbose(
      `${tag} done at page: ${page}, total: ${count.total} items processed (${count.created} created, ${count.updated} updated, ${count.skipped} skipped) in ${time.totalMs}ms (${time.downloadMs}ms download, ${time.processingMs}ms processing)`,
    )
    this.logger.debug(
      `${tag} done, total time: ${time.totalMs}ms, download time: ${time.downloadMs}ms (${Math.round(
        (time.downloadMs / time.totalMs) * 100,
      )}%), processing time: ${time.processingMs}ms (${Math.round((time.processingMs / time.totalMs) * 100)}%)`,
    )
  }
}
