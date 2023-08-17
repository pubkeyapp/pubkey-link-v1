import { Processor, WorkerHost } from '@nestjs/bullmq'
import { Logger } from '@nestjs/common'
import { NetworkType, Prisma } from '@prisma/client'
import { QueueType } from '@pubkey-link/api/queue/data-access'
import { Job } from 'bullmq'
import { ApiAssetQueueService } from '../api-asset-queue.service'

export interface AssetUpsertManyQueueData {
  assets: Prisma.AssetCreateInput[]
  network: NetworkType
}

@Processor(QueueType.AssetUpsertMany)
export class AssetUpsertManyProcessor extends WorkerHost {
  private readonly logger = new Logger(AssetUpsertManyProcessor.name)

  constructor(private readonly service: ApiAssetQueueService) {
    super()
  }
  async process(job: Job<AssetUpsertManyQueueData, void, string>): Promise<void> {
    this.logger.debug(`Processing  ${job.data.assets.length} assets on ${job.data.network} (job ${job.id})`)
    return this.service.processAssetUpsertManyJob(job)
  }
}
