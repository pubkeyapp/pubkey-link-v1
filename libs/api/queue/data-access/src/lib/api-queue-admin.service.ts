import { Injectable } from '@nestjs/common'
import { ApiCoreService } from '@pubkey-link/api/core/data-access'
import { ApiQueueService } from './api-queue.service'
import { JobStatus } from './entity/job-status.enum'
import { Job } from './entity/job.entity'
import { QueueType } from './entity/queue-type.enum'
import { Queue } from './entity/queue.entity'

@Injectable()
export class ApiQueueAdminService {
  constructor(private readonly core: ApiCoreService, private readonly queue: ApiQueueService) {}

  async adminGetQueues(adminId: string): Promise<Queue[]> {
    await this.core.ensureUserAdmin(adminId)
    return this.queue.getAllQueueInfo()
  }

  async getQueue(adminId: string, type: QueueType): Promise<Queue> {
    await this.core.ensureUserAdmin(adminId)
    return this.queue.getQueueInfo(type)
  }

  async adminGetQueueJobs(adminId: string, type: QueueType, statuses: JobStatus[]): Promise<Job[]> {
    await this.core.ensureUserAdmin(adminId)
    const queue = this.queue.queues.get(type)
    const jobs = await queue.getJobs(
      statuses.map((status) => status.toLowerCase() as any),
      0,
      100,
    )
    return jobs.map((job) => {
      const json = job.toJSON()
      return {
        ...json,
        timestamp: new Date(json.timestamp),
        processedOn: new Date(json.processedOn),
        finishedOn: new Date(json.finishedOn),
        duration: json.processedOn ? json.finishedOn - json.processedOn : undefined,
      }
    })
  }
  async adminCleanQueue(adminId: string, type: QueueType): Promise<boolean> {
    await this.core.ensureUserAdmin(adminId)
    await this.queue.queues.get(type).clean(0, 0, 'active')
    await this.queue.queues.get(type).obliterate()
    return true
  }

  async adminDeleteQueueJob(adminId: string, type: QueueType, jobId: string) {
    await this.core.ensureUserAdmin(adminId)
    const job = await this.queue.queues.get(type).getJob(jobId)
    await job.discard()
    await job.remove()
  }

  async adminPauseQueue(adminId: string, type: QueueType): Promise<boolean> {
    await this.core.ensureUserAdmin(adminId)
    await this.queue.queues.get(type).pause()
    return true
  }

  async adminResumeQueue(adminId: string, type: QueueType): Promise<boolean> {
    await this.core.ensureUserAdmin(adminId)
    await this.queue.queues.get(type).resume()
    return true
  }
}
