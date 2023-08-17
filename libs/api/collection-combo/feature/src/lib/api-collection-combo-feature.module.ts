import { Module } from '@nestjs/common'
import { ApiCollectionComboDataAccessModule } from '@pubkey-link/api/collection-combo/data-access'
import { ApiCollectionComboAdminResolver } from './api-collection-combo-admin.resolver'
import { ApiCollectionComboFieldResolver } from './api-collection-combo-field.resolver'

@Module({
  imports: [ApiCollectionComboDataAccessModule],
  providers: [ApiCollectionComboAdminResolver, ApiCollectionComboFieldResolver],
})
export class ApiCollectionComboFeatureModule {}
