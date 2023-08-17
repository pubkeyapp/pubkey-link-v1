import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@pubkey-link/api/core/data-access'
import { ApiNetworkDataAccessModule } from '@pubkey-link/api/network/data-access'
import { ApiCollectionComboAdminService } from './api-collection-combo-admin.service'
import { ApiCollectionComboService } from './api-collection-combo.service'

@Module({
  imports: [ApiCoreDataAccessModule, ApiNetworkDataAccessModule],
  providers: [ApiCollectionComboService, ApiCollectionComboAdminService],
  exports: [ApiCollectionComboService],
})
export class ApiCollectionComboDataAccessModule {}
