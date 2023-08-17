import { Processor, WorkerHost } from '@nestjs/bullmq'
import { Logger } from '@nestjs/common'
import { Identity, NetworkType, Prisma } from '@prisma/client'
import { QueueType } from '@pubkey-link/api/queue/data-access'
import { Job } from 'bullmq'
import { ApiAssetQueueService } from '../api-asset-queue.service'

export interface AssetSyncManyQueueData {
  assets: Prisma.AssetCreateInput[]
  identity: Identity
  type: NetworkType
}

@Processor(QueueType.AssetSyncMany)
export class AssetSyncManyProcessor extends WorkerHost {
  private readonly logger = new Logger(AssetSyncManyProcessor.name)

  constructor(private readonly service: ApiAssetQueueService) {
    super()
  }
  async process(job: Job<AssetSyncManyQueueData, void, string>): Promise<void> {
    this.logger.debug(
      `Processing job ${job.id}, ${job.data.assets.length} assets for ${job.data.identity.providerId} on ${job.data.type}`,
    )
    return this.service.processAssetSyncManyJob(job)
  }
}
