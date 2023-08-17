import { BullModule } from '@nestjs/bullmq'
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule, ApiCoreService } from '@pubkey-link/api/core/data-access'
import { ApiDiscordDataAccessModule } from '@pubkey-link/api/discord/data-access'
import { ApiNetworkDataAccessModule } from '@pubkey-link/api/network/data-access'
import { ApiQueueDataAccessModule, QueueType } from '@pubkey-link/api/queue/data-access'
import { ApiAssetAdminService } from './api-asset-admin.service'
import { ApiAssetQueueService } from './api-asset-queue.service'
import { ApiAssetUserService } from './api-asset-user.service'
import { ApiAssetService } from './api-asset.service'
import { processors } from './processors'

@Module({
  imports: [
    ApiCoreDataAccessModule,
    ApiDiscordDataAccessModule,
    ApiQueueDataAccessModule,
    ApiNetworkDataAccessModule,
    BullModule.registerQueueAsync({
      name: QueueType.AssetSyncMany,
      imports: [ApiCoreDataAccessModule],
      inject: [ApiCoreService],
      useFactory: ({ config }: ApiCoreService) => ({ connection: config.redisOptions }),
    }),
    BullModule.registerQueueAsync({
      name: QueueType.AssetUpsertMany,
      imports: [ApiCoreDataAccessModule],
      inject: [ApiCoreService],
      useFactory: ({ config }: ApiCoreService) => ({ connection: config.redisOptions }),
    }),
  ],
  providers: [...processors, ApiAssetService, ApiAssetAdminService, ApiAssetQueueService, ApiAssetUserService],
  exports: [ApiAssetService],
})
export class ApiAssetDataAccessModule {}
