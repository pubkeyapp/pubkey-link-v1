import { ApiCoreDataAccessModule } from '@pubkey-link/api/core/data-access'
import { Module } from '@nestjs/common'
import { ApiNetworkAdminService } from './api-network-admin.service'
import { ApiNetworkService } from './api-network.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiNetworkService, ApiNetworkAdminService],
  exports: [ApiNetworkService],
})
export class ApiNetworkDataAccessModule {}
