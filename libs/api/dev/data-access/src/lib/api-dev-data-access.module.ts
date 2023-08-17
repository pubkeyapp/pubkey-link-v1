import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@pubkey-link/api/core/data-access'
import { ApiIdentityDataAccessModule } from '@pubkey-link/api/identity/data-access'
import { ApiNetworkDataAccessModule } from '@pubkey-link/api/network/data-access'
import { ApiDevService } from './api-dev.service'

@Module({
  imports: [ApiCoreDataAccessModule, ApiIdentityDataAccessModule, ApiNetworkDataAccessModule],
  providers: [ApiDevService],
  exports: [ApiDevService],
})
export class ApiDevDataAccessModule {}
