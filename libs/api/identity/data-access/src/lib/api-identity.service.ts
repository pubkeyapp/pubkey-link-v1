import { Injectable } from '@nestjs/common'
import { Cron } from '@nestjs/schedule'
import { env } from 'node:process'
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

  @Cron(env['SYNC_SOLANA_IDENTITIES'] as string)
  async syncSolanaIdentities() {
    await this.queue.scheduleIdentitiesSyncMany({ provider: 'Solana' })
  }
}
