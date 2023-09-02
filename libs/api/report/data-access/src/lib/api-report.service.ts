import { Injectable } from '@nestjs/common'
import { ApiReportAdminService } from './api-report-admin.service'

@Injectable()
export class ApiReportService {
  constructor(readonly admin: ApiReportAdminService) {}
}
