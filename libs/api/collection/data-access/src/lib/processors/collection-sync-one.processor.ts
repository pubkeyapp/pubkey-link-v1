import { Processor, WorkerHost } from '@nestjs/bullmq'
import { Logger } from '@nestjs/common'
import { Collection } from '@prisma/client'
import { QueueType } from '@pubkey-link/api/queue/data-access'
import { Job } from 'bullmq'

import { ApiCollectionQueueService } from '../api-collection-queue.service'

export interface CollectionSyncOneQueueData {
  collection: Collection
}

@Processor(QueueType.CollectionSyncOne)
export class CollectionSyncOneProcessor extends WorkerHost {
  private readonly logger = new Logger(CollectionSyncOneProcessor.name)

  constructor(private readonly service: ApiCollectionQueueService) {
    super()
  }
  async process(job: Job<CollectionSyncOneQueueData, void, string>): Promise<void> {
    this.logger.debug(`Processing ${job.data.collection.name} on ${job.data.collection.network} (job ${job.id})`)
    return this.service.processCollectionSyncOneJob(job)
  }
}
