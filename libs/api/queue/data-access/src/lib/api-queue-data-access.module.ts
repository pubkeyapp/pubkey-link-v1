import { BullModule } from '@nestjs/bullmq'
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule, ApiCoreService } from '@pubkey-link/api/core/data-access'
import { ApiQueueAdminService } from './api-queue-admin.service'
import { ApiQueueService } from './api-queue.service'

@Module({
  providers: [ApiQueueService, ApiQueueAdminService],
  exports: [ApiQueueService, ApiQueueAdminService],
  imports: [
    ApiCoreDataAccessModule,
    BullModule.forRootAsync({
      imports: [ApiCoreDataAccessModule],
      useFactory: async ({ config }: ApiCoreService) => ({
        prefix: 'pubkey:api',
        redis: config.redisOptions,
      }),
      inject: [ApiCoreService],
    }),
  ],
})
export class ApiQueueDataAccessModule {}
