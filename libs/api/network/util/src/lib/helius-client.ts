import { Logger } from '@nestjs/common'
import { Cluster } from '@solana/web3.js'
import { AssetSortBy, AssetSortDirection, DAS, Helius } from 'helius-sdk'
import {
  AssetCount,
  GetAllAssetsByOwnerOptions,
  GetAssetsByGroupOptions,
  GetAssetsByOwnerOptions,
  GetCollectionAssetsByOwnerOptions,
  GetCollectionAssetsOptions,
  HeliusClientConfig,
} from './types/helius-client-types'

function getEndpoint(cluster: Cluster): { api: string; rpc: string } {
  switch (cluster) {
    case 'devnet':
      return { api: 'https://api-devnet.helius.xyz', rpc: 'https://devnet.helius-rpc.com' }
    case 'mainnet-beta':
      return { api: 'https://api.helius.xyz', rpc: 'https://mainnet.helius-rpc.com' }
    default:
      throw new Error(`Unknown cluster ${cluster}`)
  }
}

export class HeliusClient {
  private readonly logger: Logger
  private readonly client: Helius
  private readonly endpoint: { api: string; rpc: string }

  constructor(private readonly config: HeliusClientConfig) {
    this.client = new Helius(config.apiKey, config.cluster)
    this.logger = new Logger(HeliusClient.name + `|${config.cluster}`)
    this.endpoint = getEndpoint(config.cluster)
    this.ensureConnection().then((version) => {
      this.logger.verbose(`Connected to Cluster ${config.cluster}, running version ${version['solana-core']}`)
    })
  }

  async getCollectionAssets({ account, cb }: GetCollectionAssetsOptions) {
    const startTimeMs = Date.now()
    const time = {
      totalMs: 0,
      downloadMs: 0,
      processingMs: 0,
    }
    const count: AssetCount = {
      total: 0,
      created: 0,
      skipped: 0,
      updated: 0,
    }

    const tag = `getCollectionAssets: ${account}`

    this.logger.verbose(`${tag} start`)

    let page = 1
    let done = false

    do {
      // Download the assets from the network
      const downloadStartMs = Date.now()
      this.logger.verbose(`${tag} page: ${page}, downloading... `)
      const data = await this.getAssetsByGroup({
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

  async getAllAssetsByOwner({ ownerAccount }: GetAllAssetsByOwnerOptions): Promise<DAS.GetAssetResponse[]> {
    const tag = `getAllAssetsByOwner: ${ownerAccount} ->`
    const limit = 1000
    let page = 1
    let assets: DAS.GetAssetResponse[] = []

    do {
      this.logger.verbose(`${tag} Getting assets page ${page}...`)
      const result = await this.getAssetsByOwner({ ownerAccount, page, limit })
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

  private async ensureConnection() {
    try {
      return this.client.connection.getVersion()
    } catch (error) {
      this.logger.error(`Failed to connect to Network ${this.config.cluster}`, error)
      throw error
    }
  }

  async getCollectionAssetsByOwner({ collectionAccounts, ownerAccount }: GetCollectionAssetsByOwnerOptions) {
    const tag = `getCollectionAssetsByOwner ${ownerAccount} ${collectionAccounts
      .map((x) => x.substring(0, 3))
      .join(' ')} ->`
    const result = await this.getAllAssetsByOwner({ ownerAccount })
    if (!result.length) {
      this.logger.debug(`${tag} no assets found, skipping...`)
      return []
    }

    this.logger.verbose(`${tag} Found ${result.length} assets, filtering...`)

    // Filter out only those that are in the collection
    const filtered = result.filter(
      (asset) =>
        !!asset.grouping?.find((g) => g.group_key === 'collection' && collectionAccounts.includes(g.group_value)),
    )

    if (!filtered.length) {
      this.logger.debug(`${tag} no assets found after filtering, skipping...`)
      return []
    }
    return filtered
  }

  private async getAssetsByOwner({
    ownerAccount,
    page = 1,
    limit = 1000,
  }: GetAssetsByOwnerOptions): Promise<DAS.GetAssetResponseList> {
    return this.client.rpc.getAssetsByOwner({
      limit,
      ownerAddress: ownerAccount,
      page,
      sortBy: { sortBy: AssetSortBy.Updated, sortDirection: AssetSortDirection.Asc },
    })
  }

  private async getAssetsByGroup({ collectionAccount, page = 1, limit = 1000 }: GetAssetsByGroupOptions) {
    return this.client.rpc.getAssetsByGroup({ groupKey: 'collection', groupValue: collectionAccount, limit, page })
  }

  getAsset(mint: string) {
    return this.client.rpc.getAsset(mint)
  }

  async getAssets(mints: string[]) {
    return fetch(`${this.endpoint.rpc}/?api-key=${this.config.apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 'id-1',
        method: 'getAssetBatch',
        params: { ids: mints },
      }),
    })
      .then((res) => res.json())
      .then((res) => res?.result ?? [])
      .catch((err) => console.log(`getAssetsByMint: error: ${err}`))
  }

  async getTokenMetadata(mint: string) {
    return fetch(`${this.endpoint.api}/v0/token-metadata?api-key=${this.config.apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        mintAccounts: [mint],
        includeOffChain: true,
        disableCache: false,
      }),
    })
      .then((res) => res.json())
      .catch((err) => console.log(`getTokenMetadata: error: ${err}`))
  }
}
