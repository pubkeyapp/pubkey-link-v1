import { Module } from '@nestjs/common'
import { ApiNetworkDataAccessModule } from '@pubkey-link/api/network/data-access'
import { ApiNetworkAdminResolver } from './api-network-admin.resolver'
import { ApiNetworkFieldResolver } from './api-network-field.resolver'

@Module({
  imports: [ApiNetworkDataAccessModule],
  providers: [ApiNetworkAdminResolver, ApiNetworkFieldResolver],
})
export class ApiNetworkFeatureModule {}
