import { InjectQueue } from '@nestjs/bullmq'
import { Logger, OnModuleInit } from '@nestjs/common'
import { NetworkType } from '@prisma/client'
import { ApiCoreService } from '@pubkey-link/api/core/data-access'
import { ApiDiscordService } from '@pubkey-link/api/discord/data-access'
import { ApiQueueService, QueueType } from '@pubkey-link/api/queue/data-access'
import { Job, Queue } from 'bullmq'
import { AssetSyncManyQueueData } from './processors/asset-sync-many.processor'
import { AssetUpsertManyQueueData } from './processors/asset-upsert-many-processor'

export class ApiAssetQueueService implements OnModuleInit {
  private readonly logger = new Logger(ApiAssetQueueService.name)
  constructor(
    @InjectQueue(QueueType.AssetUpsertMany) readonly assetUpsertManyQueue: Queue<AssetUpsertManyQueueData>,
    @InjectQueue(QueueType.AssetSyncMany) readonly assetSyncManyQueue: Queue<AssetSyncManyQueueData>,
    readonly core: ApiCoreService,
    private readonly queue: ApiQueueService,
    private readonly discord: ApiDiscordService,
  ) {}

  async onModuleInit() {
    this.queue.registerQueue(QueueType.AssetUpsertMany, this.assetUpsertManyQueue)
    this.queue.registerQueue(QueueType.AssetSyncMany, this.assetSyncManyQueue)
  }

  private getAssetCounts() {
    return this.core.data.asset.groupBy({
      by: ['collectionAccount', 'network'],
      _count: { id: true },
    })
  }

  async scheduleAssetUpsertMany(data: AssetUpsertManyQueueData) {
    return this.assetUpsertManyQueue.add('upsert-assets', data, { removeOnComplete: true }).catch((err) => {
      this.logger.error(`An error occurred: ${err}`)
    })
  }

  async scheduleAssetSyncMany(data: AssetSyncManyQueueData) {
    return this.assetSyncManyQueue.add('sync-assets', data, { removeOnComplete: true }).catch((err) => {
      this.logger.error(`An error occurred: ${err}`)
    })
  }

  async processAssetSyncManyJob(job: Job<AssetSyncManyQueueData, void, string>) {
    const tag = `AssetSyncManyJob ${job.id} ->`
    this.logger.verbose(`${tag} processing ${job.data.assets.length} assets...`)
    const { type: network, identity } = job.data

    this.logger.verbose(`${tag} getting owned assets...`)
    const owned = await this.getOwnedAssets({ networkType: network, providerId: identity.providerId })

    this.logger.verbose(`${tag} found ${owned.length} owned assets...`)
    const toCreate = job.data.assets.filter((asset) => !owned.find((a) => a.account === asset.account))
    const toDisconnect = owned.filter((asset) => !job.data.assets.find((a) => a.account === asset.account))

    if (!toCreate.length && !toDisconnect.length) {
      this.logger.debug(`${tag} nothing to do, exiting...`)
      return
    }

    this.logger.verbose(
      `processAssetSyncManyJob: Found ${owned.length} owned assets. ${toCreate.length} to connect and ${toDisconnect.length} to disconnect`,
    )
    await this.discord.bot.sendCommandChannel(
      `${network} ${identity.providerId}: Found ${owned.length} owned assets. ${toCreate.length} to connect and ${toDisconnect.length} to disconnect`,
    )

    for (const { account, network, owner } of toDisconnect) {
      this.logger.verbose(
        `disconnecting ${account} on ${network}, owner changed from ${identity.providerId} to ${owner}`,
      )
      await this.core.data.asset.update({
        where: { account_network: { network, account } },
        data: { identity: { disconnect: true } },
      })
    }

    if (toCreate.length) {
      await this.scheduleAssetUpsertMany({ assets: toCreate, network: network })
      this.logger.verbose(`Scheduled ${toCreate.length} assets to be created on ${network}`)
    }
  }

  private async getOwnedAssets(param: { providerId: string; networkType: NetworkType }) {
    return this.core.data.asset.findMany({
      where: {
        network: { in: [param.networkType] },
        identity: { providerId: param.providerId },
      },
    })
  }

  async processAssetUpsertManyJob(job: Job<AssetUpsertManyQueueData, void, string>) {
    const tag = `AssetCreateManyJob ${job.id} ->`
    this.logger.verbose(`${tag} processing with ${job.data.assets.length} assets...`)
    let count = 0
    let errors = 0
    for (const data of job.data.assets) {
      count++
      if (count % 100 === 0) {
        this.logger.verbose(`${tag} processed ${count}/${job.data.assets.length} assets`)
      }

      const network = data?.collection?.connect?.account_network?.network
      if (!network) {
        throw new Error('No network')
      }
      this.logger.verbose(`${tag} upserting asset ${data.account} on ${network}`)
      await this.core.data.asset
        .upsert({
          where: { account_network: { account: data.account, network } },
          create: { ...data },
          update: { ...data },
        })
        .catch((err) => {
          this.logger.error(`${tag} error creating asset`, err, data)
          errors++
        })
    }
    this.logger.verbose(`${tag} processed, ${errors} errors`)
    if (errors) {
      await this.discord.bot.sendCommandChannel(`Error creating ${errors} assets, check logs`)
      throw new Error('Error creating assets')
    }
    await this.updateAssetCounts()
  }

  private async updateAssetCounts() {
    const counters = await this.getAssetCounts()
    if (!counters.length) {
      return
    }

    for (const {
      network,
      collectionAccount,
      _count: { id: assetCount },
    } of counters) {
      const tag = `updateAssetCount ${network} ${collectionAccount} ->`
      const collection = await this.core.data.collection.findUnique({
        where: { account_network: { account: collectionAccount, network } },
      })
      if (!collection || collection.assetCount === assetCount) {
        this.logger.debug(`${tag} skipped ${collection?.assetCount} = ${assetCount}`)
        continue
      }
      await this.core.data.collection.update({
        where: { account_network: { network, account: collectionAccount } },
        data: { assetCount },
      })
      this.logger.verbose(`${tag} updated ${collection.assetCount} to ${assetCount}`)
    }
  }
}
