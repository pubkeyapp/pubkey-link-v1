import { Module } from '@nestjs/common'
import { ApiReportDataAccessModule } from '@pubkey-link/api/report/data-access'
import { ApiReportAdminResolver } from './api-report-admin.resolver'

@Module({
  imports: [ApiReportDataAccessModule],
  providers: [ApiReportAdminResolver],
})
export class ApiReportFeatureModule {}
