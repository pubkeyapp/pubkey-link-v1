import { Injectable, Logger } from '@nestjs/common'
import { Cron } from '@nestjs/schedule'
import { ApiCoreService } from '@pubkey-link/api/core/data-access'
import { env } from 'node:process'
import { ApiIdentityAdminService } from './api-identity-admin.service'
import { ApiIdentityQueueService } from './api-identity-queue.service'
import { ApiIdentityUserService } from './api-identity-user.service'

@Injectable()
export class ApiIdentityService {
  private readonly logger = new Logger(ApiIdentityService.name)
  constructor(
    private readonly core: ApiCoreService,
    readonly admin: ApiIdentityAdminService,
    readonly user: ApiIdentityUserService,
    readonly queue: ApiIdentityQueueService,
  ) {}

  @Cron(env['SYNC_SOLANA_IDENTITIES'] as string)
  async syncSolanaIdentities() {
    if (!this.core.config.syncActive) {
      this.logger.verbose(`syncSolanaIdentities: syncActive is false, skipping`)
      return
    }
    await this.queue.scheduleIdentitiesSyncMany({ provider: 'Solana' })
  }
}
