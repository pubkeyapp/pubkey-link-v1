import { Module } from '@nestjs/common'
import { ApiAssetFeatureModule } from '@pubkey-link/api/asset/feature'
import { ApiAuthFeatureModule } from '@pubkey-link/api/auth/feature'
import { ApiBackupFeatureModule } from '@pubkey-link/api/backup/feature'
import { ApiCollectionComboFeatureModule } from '@pubkey-link/api/collection-combo/feature'
import { ApiCollectionFeatureModule } from '@pubkey-link/api/collection/feature'
import { ApiCoreDataAccessModule } from '@pubkey-link/api/core/data-access'
import { ApiDevFeatureModule } from '@pubkey-link/api/dev/feature'
import { ApiDiscordServerFeatureModule } from '@pubkey-link/api/discord-server/feature'
import { ApiDiscordFeatureModule } from '@pubkey-link/api/discord/feature'
import { ApiEmailFeatureModule } from '@pubkey-link/api/email/feature'
import { ApiIdentityFeatureModule } from '@pubkey-link/api/identity/feature'
import { ApiNetworkFeatureModule } from '@pubkey-link/api/network/feature'
import { ApiQueueFeatureModule } from '@pubkey-link/api/queue/feature'
import { ApiReportFeatureModule } from '@pubkey-link/api/report/feature'
import { ApiUserFeatureModule } from '@pubkey-link/api/user/feature'
import { ApiCoreController } from './api-core.controller'
import { ApiCoreResolver } from './api-core.resolver'

const imports = [
  ApiAssetFeatureModule,
  ApiAuthFeatureModule,
  ApiBackupFeatureModule,
  ApiCollectionComboFeatureModule,
  ApiCollectionFeatureModule,
  ApiCoreDataAccessModule,
  ApiDevFeatureModule,
  ApiDiscordFeatureModule,
  ApiDiscordServerFeatureModule,
  ApiEmailFeatureModule,
  ApiIdentityFeatureModule,
  ApiNetworkFeatureModule,
  ApiQueueFeatureModule,
  ApiReportFeatureModule,
  ApiUserFeatureModule,
]

@Module({
  controllers: [ApiCoreController],
  imports: [...imports],
  providers: [ApiCoreResolver],
})
export class ApiCoreFeatureModule {}
