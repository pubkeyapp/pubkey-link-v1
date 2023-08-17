import { InjectQueue } from '@nestjs/bullmq'
import { Logger, OnModuleInit } from '@nestjs/common'
import { Asset as PrismaAsset, Collection, NetworkType, Prisma } from '@prisma/client'
import { ApiAssetService, AssetAttribute } from '@pubkey-link/api/asset/data-access'
import { ApiCoreService } from '@pubkey-link/api/core/data-access'
import { ApiNetworkService, HandleAssetCount } from '@pubkey-link/api/network/data-access'
import { ApiQueueService, QueueType } from '@pubkey-link/api/queue/data-access'
import { Job, Queue } from 'bullmq'
import { DAS } from 'helius-sdk'
import HumanDiff from 'human-object-diff'
import { hasher } from 'node-object-hash'
import { ApiCollectionAdminService } from './api-collection-admin.service'
import { CollectionSyncManyQueueData, CollectionSyncOneQueueData } from './processors'

export class ApiCollectionQueueService implements OnModuleInit {
  private readonly hasher = hasher({ sort: true, coerce: false })
  private readonly logger = new Logger(ApiCollectionQueueService.name)
  constructor(
    @InjectQueue(QueueType.CollectionSyncMany) readonly collectionSyncManyQueue: Queue<CollectionSyncManyQueueData>,
    @InjectQueue(QueueType.CollectionSyncOne) readonly collectionSyncOneQueue: Queue<CollectionSyncOneQueueData>,

    readonly core: ApiCoreService,
    private readonly asset: ApiAssetService,
    private readonly admin: ApiCollectionAdminService,
    private readonly network: ApiNetworkService,
    private readonly queue: ApiQueueService,
  ) {}

  async onModuleInit() {
    this.queue.registerQueue(QueueType.CollectionSyncMany, this.collectionSyncManyQueue)
    this.queue.registerQueue(QueueType.CollectionSyncOne, this.collectionSyncOneQueue)
  }

  async scheduleCollectionSyncMany(data: CollectionSyncManyQueueData) {
    return this.collectionSyncManyQueue.add('sync-collections', data, { removeOnComplete: true }).catch((err) => {
      this.logger.error(`An error occurred: ${err}`)
    })
  }

  async scheduleCollectionSyncOne(data: CollectionSyncOneQueueData) {
    return this.collectionSyncOneQueue.add('sync-collections', data, { removeOnComplete: true }).catch((err) => {
      this.logger.error(`An error occurred: ${err}`)
    })
  }

  async processCollectionSyncManyJob(job: Job<CollectionSyncManyQueueData, void, string>) {
    this.logger.verbose(`Processing job ${job.id}`, job.data.collections.length)
    const { collections } = job.data
    for (const collection of collections) {
      await this.scheduleCollectionSyncOne({ collection })
    }
    this.logger.verbose(`Processed job ${job.id}`, job.data.collections.length)
  }

  async processCollectionSyncOneJob(job: Job<CollectionSyncOneQueueData, void, string>) {
    this.logger.verbose(`Processing job ${job.id}`, job.data.collection.name)
    const { collection } = job.data

    await this.fetchCollectionAssets(collection)

    this.logger.verbose(`Processed job ${job.id}`, job.data.collection.name)
  }

  private async fetchCollectionAssets(collection: Collection) {
    const tag = `fetchCollectionAssets: ${collection.network} => ${collection.account}`
    this.logger.verbose(`${tag} fetching assets...`)
    console.time(tag)

    const totalCount = {
      total: 0,
      created: 0,
      skipped: 0,
      updated: 0,
      timeInAssets: 0,
      timeInAttributes: 0,
    }

    await this.network.getCollectionAssets(collection.network, collection.id, collection.account, async (items) => {
      console.timeLog(tag, `fetched ${items.length} assets`)
      const time = Date.now()
      const { total, updated, skipped, created } = await this.handleAssets({
        network: collection.network,
        collectionAccount: collection.account,
        items,
      })
      console.timeLog(tag, `handled ${items.length} assets`)

      totalCount.total = totalCount.total + total
      totalCount.created = totalCount.created + created
      totalCount.updated = totalCount.updated + updated
      totalCount.skipped = totalCount.skipped + skipped
      totalCount.timeInAssets = totalCount.timeInAssets + (Date.now() - time)

      return {
        total: totalCount.total,
        created: totalCount.created,
        updated: totalCount.updated,
        skipped: totalCount.skipped,
      }
    })
    console.timeEnd(tag)
    this.logger.verbose(
      `${tag} done, total: ${totalCount.total}, created: ${totalCount.created}, updated: ${totalCount.updated}, skipped: ${totalCount.skipped}, time: ${totalCount.timeInAssets}ms`,
    )
  }

  async syncCollectionOld(collection: Collection) {
    const startTime = Date.now()
    const { account: collectionAccount, network } = collection
    const tag = `syncCollection: ${network} => ${collectionAccount}`
    console.time(tag)
  }

  private async handleAssets({
    network,
    collectionAccount,
    items,
  }: {
    network: NetworkType
    collectionAccount: string
    items: DAS.GetAssetResponse[]
  }): Promise<HandleAssetCount> {
    const tag = `handleAssets: ${network} => ${collectionAccount}`
    const time = Date.now()
    const count: HandleAssetCount = {
      total: 0,
      created: 0,
      skipped: 0,
      updated: 0,
    }

    this.logger.verbose(`${tag} (assets) found ${items.length} assets`)

    // Filter out assets without metadata
    const filteredItems = items.filter((item) => item.content?.metadata)
    // Get the ids of the filtered items
    const filteredIds = filteredItems.map((item) => item.id)

    // Get existing assets
    const existingAssets = await this.core.data.asset.findMany({
      where: { network, account: { in: filteredIds } },
    })
    const existingAssetsMap: Record<string, PrismaAsset> = existingAssets.reduce(
      (acc, cur) => ({ ...acc, [cur.account]: cur }),
      {},
    )

    // Figure out which assets are missing
    const missingAssetIds = filteredIds.filter((id) => !existingAssetsMap[id])

    const assetCreates: Prisma.AssetCreateInput[] = []
    const assetUpdates: Prisma.AssetCreateInput[] = []

    for (const item of filteredItems) {
      // Prepare assets for storage
      const itemAttributes: { key: string; value: string }[] = (item.content?.metadata?.attributes ?? []).map(
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

      const processed: Prisma.AssetCreateInput | Prisma.AssetUpdateInput = {
        account: item.id,
        name: item?.content?.metadata?.name,
        metadata: item.content?.metadata as unknown as Prisma.JsonObject,
        attributes: attributes,
        image: item.content?.files?.[0]?.uri,
        attributeMap,
        owner: item.ownership?.owner,
        collection: { connect: { account_network: { account: collectionAccount, network } } },
        raw: item as unknown as Prisma.JsonObject,
        rawHash: this.hasher.hash(item),
      }

      // If the asset is missing, we need to create it
      if (missingAssetIds.includes(item.id)) {
        assetCreates.push(processed as Prisma.AssetCreateInput)
        continue
      }

      // If the asset exists, we need to check if it has changed
      if (existingAssetsMap[item.id].rawHash !== this.hasher.hash(item)) {
        const { diff } = new HumanDiff({})
        const diffString = diff(existingAssetsMap[item.id].raw, item)
        this.logger.log(`${tag} (assets) ${item.id} has changes: ${diffString}`)

        assetUpdates.push(processed as Prisma.AssetCreateInput)
        continue
      }
      // If the asset exists and has not changed, we skip it
      count.skipped = count.skipped + 1
    }

    if (assetCreates.length) {
      this.logger.verbose(`${tag} (assets) creating ${assetCreates.length} assets...`)
      await this.asset.queue.scheduleAssetUpsertMany({ assets: assetCreates, network })
      count.created = count.created + assetCreates.length
    }

    if (assetUpdates.length) {
      this.logger.verbose(`${tag} (assets) updating ${assetUpdates.length} assets...`)
      await this.asset.queue.scheduleAssetUpsertMany({ assets: assetUpdates, network })
      count.updated = count.updated + assetUpdates.length
    }

    count.total = count.created + count.updated + count.skipped

    this.logger.debug(
      `${tag} (assets) done, total: ${count.total}, created: ${count.created}, updated: ${count.updated}, skipped: ${
        count.skipped
      }, time: ${Date.now() - time}ms`,
    )
    return count
  }

  private async countCollectionAttributes(collection: Collection) {
    const { account: collectionAccount, network } = collection

    const tag = `countCollectionAttributes: ${network} => ${collectionAccount}`
    console.time(tag)

    const batch = 10000
    let page = 1
    let done = false

    const attributeCounts: Record<string, number> = {}

    while (!done) {
      this.logger.verbose(`${tag} page: ${page}, batch: ${batch} querying... `)
      console.timeLog(tag, `page: ${page}, batch: ${batch} querying... `)
      const assets = await this.core.data.asset.findMany({
        where: { network, collectionAccount },
        skip: (page - 1) * batch,
        take: batch,
        orderBy: { id: 'asc' },
      })

      this.logger.verbose(`${tag} page: ${page}, batch: ${batch}, counting... `)
      console.timeLog(tag, `page: ${page}, batch: ${batch}, counting... `)
      for (const asset of assets) {
        if (!asset.attributes) {
          continue
        }
        for (const attribute of asset.attributes as unknown as AssetAttribute[]) {
          const countKey = `${attribute.key}:${attribute.value}`

          if (!attributeCounts[countKey]) {
            attributeCounts[countKey] = 1
          } else {
            attributeCounts[countKey] = attributeCounts[countKey] + 1
          }
        }
      }

      if (!assets.length || assets.length < batch) {
        this.logger.verbose(`${tag} page: ${page}, batch: ${batch} done`)
        done = true
        break
      }
      page = page + 1
    }

    const attributes: AssetAttribute[] = []

    for (const countKey of Object.keys(attributeCounts)) {
      const [key, value] = countKey.split(':')
      attributes.push({ key, value, count: attributeCounts[countKey] })
    }

    console.timeEnd(tag)
    return attributes
  }
}
