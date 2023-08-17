import { Processor, WorkerHost } from '@nestjs/bullmq'
import { Logger } from '@nestjs/common'
import { Identity, NetworkType } from '@prisma/client'
import { QueueType } from '@pubkey-link/api/queue/data-access'
import { Job } from 'bullmq'
import { ApiIdentityQueueService } from '../api-identity-queue.service'

export interface IdentitySyncOneQueueData {
  identity: Identity
  collectionMap: Record<NetworkType, string[]>
}

@Processor(QueueType.IdentitySyncOne)
export class IdentitySyncOneProcessor extends WorkerHost {
  private readonly logger = new Logger(IdentitySyncOneProcessor.name)

  constructor(private readonly service: ApiIdentityQueueService) {
    super()
  }
  async process(job: Job<IdentitySyncOneQueueData, void, string>): Promise<void> {
    this.logger.debug(`Processing job ${job.id}`)
    return this.service.processIdentitySyncOneJob(job)
  }
}
