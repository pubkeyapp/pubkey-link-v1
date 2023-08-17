import { Processor, WorkerHost } from '@nestjs/bullmq'
import { Logger } from '@nestjs/common'
import { IdentityProvider } from '@prisma/client'
import { QueueType } from '@pubkey-link/api/queue/data-access'
import { Job } from 'bullmq'
import { ApiIdentityQueueService } from '../api-identity-queue.service'

export interface IdentitySyncManyQueueData {
  provider: IdentityProvider
  ownerId?: string
}

@Processor(QueueType.IdentitySyncMany)
export class IdentitySyncManyProcessor extends WorkerHost {
  private readonly logger = new Logger(IdentitySyncManyProcessor.name)

  constructor(private readonly service: ApiIdentityQueueService) {
    super()
  }
  async process(job: Job<IdentitySyncManyQueueData, void, string>): Promise<void> {
    this.logger.debug(`Processing provider ${job.data.provider} (job ${job.id})`)
    await this.service.processIdentitySyncManyJob(job)
  }
}
