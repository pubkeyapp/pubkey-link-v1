import { Injectable } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import { ApiIdentityAdminService } from './api-identity-admin.service'
import { ApiIdentityQueueService } from './api-identity-queue.service'
import { ApiIdentityUserService } from './api-identity-user.service'

@Injectable()
export class ApiIdentityService {
  constructor(
    readonly admin: ApiIdentityAdminService,
    readonly user: ApiIdentityUserService,
    readonly queue: ApiIdentityQueueService,
  ) {}

  @Cron(CronExpression.EVERY_10_MINUTES)
  async syncIdentities() {
    await this.queue.scheduleIdentitiesSyncMany({ provider: 'Solana' })
  }
}
