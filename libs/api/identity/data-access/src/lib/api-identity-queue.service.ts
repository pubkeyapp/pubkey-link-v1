import { InjectQueue } from '@nestjs/bullmq'
import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { Identity, IdentityProvider, NetworkType } from '@prisma/client'
import { ApiAssetService } from '@pubkey-link/api/asset/data-access'
import { ApiCoreService } from '@pubkey-link/api/core/data-access'
import { ApiNetworkService } from '@pubkey-link/api/network/data-access'
import { ApiQueueService, QueueType } from '@pubkey-link/api/queue/data-access'
import { Job, Queue } from 'bullmq'
import { IdentitySyncManyQueueData, IdentitySyncOneQueueData } from './processors'

@Injectable()
export class ApiIdentityQueueService implements OnModuleInit {
  private readonly logger = new Logger(ApiIdentityQueueService.name)
  constructor(
    @InjectQueue(QueueType.IdentitySyncMany) readonly identitySyncManyQueue: Queue<IdentitySyncManyQueueData>,
    @InjectQueue(QueueType.IdentitySyncOne) readonly identitySyncOneQueue: Queue<IdentitySyncOneQueueData>,
    readonly core: ApiCoreService,
    private readonly asset: ApiAssetService,
    private readonly queue: ApiQueueService,
    private readonly network: ApiNetworkService,
  ) {}

  async onModuleInit() {
    this.queue.registerQueue(QueueType.IdentitySyncOne, this.identitySyncOneQueue)
    this.queue.registerQueue(QueueType.IdentitySyncMany, this.identitySyncManyQueue)
  }

  async processIdentitySyncManyJob(job: Job<IdentitySyncManyQueueData>) {
    const { provider, ownerId } = job.data

    const [collectionMap, identities] = await Promise.all([
      this.core.getProviderCollectionMap(provider),
      this.getIdentitiesByProvider(provider, ownerId),
    ])

    const collectionCount = Object.keys(collectionMap).reduce(
      (acc, key) => acc + collectionMap[key as NetworkType].length,
      0,
    )

    this.logger.debug(
      `Processing ${provider} ${identities.length} identities for ${collectionCount} collections on ${Object.keys(
        collectionMap,
      ).join(', ')}...`,
    )
    for (const identity of identities) {
      this.logger.debug(`Processing ${provider} -> ${identity.providerId}`)
      await this.scheduleIdentitySyncOne({ identity, collectionMap })
    }
  }

  async processIdentitySyncOneJob(job: Job<IdentitySyncOneQueueData>) {
    const { collectionMap, identity } = job.data
    const { provider, providerId } = identity

    if (!Object.keys(collectionMap).length) {
      const message = `No collections found for provider ${provider}`
      this.logger.verbose(message)
      return
    }

    if (!identity) {
      const message = `Identity not found for job ${job.id}`
      this.logger.verbose(message)
      return
    }

    let count = 0
    const tag = `${provider} -> ${providerId} processing`

    this.logger.log(`${tag} -> getting assets...`)
    // Get the assets in these collections for this owner
    const assetMap = await this.network.getOwnedAndStakedAssets({
      ownerAccount: identity.providerId,
      collectionMap,
      identity,
    })

    for (const type of Object.keys(assetMap) as NetworkType[]) {
      const assets = assetMap[type]
      if (!assets.length) {
        continue
      }
      this.logger.log(`${tag} -> found ${assets.length} assets on ${type}, syncing...`)
      await this.asset.queue.scheduleAssetSyncMany({ assets, identity, type })
      count += assets.length
    }
    if (count > 0) {
      this.logger.verbose(`${tag} -> synced ${count} assets`)
    } else {
      this.logger.debug(`${tag} -> no assets found`)
    }
  }

  async scheduleIdentitySyncOne(data: IdentitySyncOneQueueData) {
    return this.identitySyncOneQueue.add('sync-identity', data, { removeOnComplete: true }).catch((err) => {
      this.logger.error(`scheduleIdentitySyncOne: An error occurred: ${err}`)
    })
  }

  async scheduleIdentitiesSyncMany(data: IdentitySyncManyQueueData) {
    return this.identitySyncManyQueue.add('sync-identities', data, { removeOnComplete: true }).catch((err) => {
      this.logger.error(`scheduleIdentitiesSyncMany: An error occurred: ${err}`)
    })
  }

  private async getIdentitiesByProvider(provider: IdentityProvider, ownerId?: string): Promise<Identity[]> {
    return this.core.data.identity.findMany({
      where: {
        provider,
        ownerId: ownerId ?? undefined,
      },
    })
  }
}
