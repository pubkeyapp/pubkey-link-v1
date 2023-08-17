import { BullModule } from '@nestjs/bullmq'
import { Module } from '@nestjs/common'
import { ApiAssetDataAccessModule } from '@pubkey-link/api/asset/data-access'
import { ApiCoreDataAccessModule, ApiCoreService } from '@pubkey-link/api/core/data-access'
import { ApiNetworkDataAccessModule } from '@pubkey-link/api/network/data-access'
import { ApiQueueDataAccessModule, QueueType } from '@pubkey-link/api/queue/data-access'
import { ApiIdentityAdminService } from './api-identity-admin.service'
import { ApiIdentityQueueService } from './api-identity-queue.service'
import { ApiIdentityUserService } from './api-identity-user.service'
import { ApiIdentityService } from './api-identity.service'
import { processors } from './processors'

@Module({
  imports: [
    ApiAssetDataAccessModule,
    ApiCoreDataAccessModule,
    ApiNetworkDataAccessModule,
    ApiQueueDataAccessModule,
    BullModule.registerQueueAsync({
      name: QueueType.IdentitySyncOne,
      imports: [ApiCoreDataAccessModule],
      inject: [ApiCoreService],
      useFactory: async ({ config }: ApiCoreService) => ({
        connection: config.redisOptions,
      }),
    }),
    BullModule.registerQueueAsync({
      name: QueueType.IdentitySyncMany,
      imports: [ApiCoreDataAccessModule],
      inject: [ApiCoreService],
      useFactory: async ({ config }: ApiCoreService) => ({
        connection: config.redisOptions,
      }),
    }),
  ],
  providers: [
    ...processors,
    ApiIdentityAdminService,
    ApiIdentityQueueService,
    ApiIdentityService,
    ApiIdentityUserService,
  ],
  exports: [ApiIdentityService],
})
export class ApiIdentityDataAccessModule {}
