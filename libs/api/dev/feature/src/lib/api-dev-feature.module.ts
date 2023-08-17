import { Module } from '@nestjs/common'
import { ApiDevDataAccessModule } from '@pubkey-link/api/dev/data-access'
import { ApiDevAdminResolver } from './api-dev-admin-resolver'

@Module({
  imports: [ApiDevDataAccessModule],
  providers: [ApiDevAdminResolver],
})
export class ApiDevFeatureModule {}
