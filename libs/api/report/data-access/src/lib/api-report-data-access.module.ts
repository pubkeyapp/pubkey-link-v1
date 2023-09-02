import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@pubkey-link/api/core/data-access'
import { ApiDiscordDataAccessModule } from '@pubkey-link/api/discord/data-access'
import { ApiReportAdminService } from './api-report-admin.service'
import { ApiReportService } from './api-report.service'

@Module({
  imports: [ApiCoreDataAccessModule, ApiDiscordDataAccessModule],
  providers: [ApiReportService, ApiReportAdminService],
  exports: [ApiReportService],
})
export class ApiReportDataAccessModule {}
