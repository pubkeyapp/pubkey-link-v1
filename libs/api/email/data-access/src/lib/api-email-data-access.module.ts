import { ApiCoreDataAccessModule } from '@pubkey-link/api/core/data-access'
import { Module } from '@nestjs/common'
import { ApiEmailAdminService } from './api-email-admin.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiEmailAdminService],
  exports: [ApiEmailAdminService],
})
export class ApiEmailDataAccessModule {}
