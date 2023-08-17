import { ApiQueueDataAccessModule } from '@pubkey-link/api/queue/data-access'
import { Module } from '@nestjs/common'
import { ApiQueueAdminResolver } from './api-queue-admin.resolver'

@Module({
  providers: [ApiQueueAdminResolver],
  imports: [ApiQueueDataAccessModule],
})
export class ApiQueueFeatureModule {}
