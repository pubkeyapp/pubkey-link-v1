import { ApiEmailDataAccessModule } from '@pubkey-link/api/email/data-access'
import { Module } from '@nestjs/common'
import { ApiEmailAdminResolver } from './api-email-admin.resolver'

@Module({
  imports: [ApiEmailDataAccessModule],
  providers: [ApiEmailAdminResolver],
})
export class ApiEmailFeatureModule {}
