import { BullModule } from '@nestjs/bullmq'
import { Module } from '@nestjs/common'
import { ApiAssetDataAccessModule } from '@pubkey-link/api/asset/data-access'
import { ApiCoreDataAccessModule, ApiCoreService } from '@pubkey-link/api/core/data-access'
import { ApiNetworkDataAccessModule } from '@pubkey-link/api/network/data-access'
import { ApiQueueDataAccessModule, QueueType } from '@pubkey-link/api/queue/data-access'
import { ApiCollectionAdminService } from './api-collection-admin.service'
import { ApiCollectionQueueService } from './api-collection-queue.service'
import { ApiCollectionUserService } from './api-collection-user.service'
import { ApiCollectionService } from './api-collection.service'
import { processors } from './processors'

// Circular dependency between "api-collection-data-access" and "api-asset-data-access" detected:
//  api-collection-data-access
//    -> api-asset-data-access
//    -> api-discord-data-access
//    -> api-identity-data-access
//    -> api-collection-data-access

@Module({
  imports: [
    ApiAssetDataAccessModule,
    ApiCoreDataAccessModule,
    ApiNetworkDataAccessModule,
    ApiQueueDataAccessModule,
    BullModule.registerQueueAsync({
      name: QueueType.CollectionSyncMany,
      imports: [ApiCoreDataAccessModule],
      inject: [ApiCoreService],
      useFactory: ({ config }: ApiCoreService) => ({ connection: config.redisOptions }),
    }),
    BullModule.registerQueueAsync({
      name: QueueType.CollectionSyncOne,
      imports: [ApiCoreDataAccessModule],
      inject: [ApiCoreService],
      useFactory: ({ config }: ApiCoreService) => ({ connection: config.redisOptions }),
    }),
  ],
  providers: [
    ...processors,
    ApiCollectionAdminService,
    ApiCollectionQueueService,
    ApiCollectionService,
    ApiCollectionUserService,
  ],
  exports: [ApiCollectionService],
})
export class ApiCollectionDataAccessModule {}
