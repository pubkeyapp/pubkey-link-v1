import { Module } from '@nestjs/common'
import { ApiAssetDataAccessModule } from '@pubkey-link/api/asset/data-access'
import { ApiAssetAdminResolver } from './api-asset-admin.resolver'
import { ApiAssetFieldResolver } from './api-asset-field.resolver'
import { ApiAssetUserResolver } from './api-asset-user.resolver'

@Module({
  imports: [ApiAssetDataAccessModule],
  providers: [ApiAssetAdminResolver, ApiAssetFieldResolver, ApiAssetUserResolver],
})
export class ApiAssetFeatureModule {}
