import { Processor, WorkerHost } from '@nestjs/bullmq'
import { Logger } from '@nestjs/common'
import { Collection } from '@prisma/client'
import { QueueType } from '@pubkey-link/api/queue/data-access'
import { Job } from 'bullmq'

import { ApiCollectionQueueService } from '../api-collection-queue.service'

export interface CollectionSyncManyQueueData {
  collections: Collection[]
}

@Processor(QueueType.CollectionSyncMany)
export class CollectionSyncManyProcessor extends WorkerHost {
  private readonly logger = new Logger(CollectionSyncManyProcessor.name)

  constructor(private readonly service: ApiCollectionQueueService) {
    super()
  }
  async process(job: Job<CollectionSyncManyQueueData, void, string>): Promise<void> {
    this.logger.debug(`Processing ${job.data.collections.length} (job ${job.id})`)
    return this.service.processCollectionSyncManyJob(job)
  }
}
