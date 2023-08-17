import { Module } from '@nestjs/common'
import { ApiCollectionDataAccessModule } from '@pubkey-link/api/collection/data-access'
import { ApiCollectionAdminResolver } from './api-collection-admin.resolver'
import { ApiCollectionFieldResolver } from './api-collection-field.resolver'
import { ApiCollectionUserResolver } from './api-collection-user.resolver'

@Module({
  imports: [ApiCollectionDataAccessModule],
  providers: [ApiCollectionAdminResolver, ApiCollectionFieldResolver, ApiCollectionUserResolver],
})
export class ApiCollectionFeatureModule {}
