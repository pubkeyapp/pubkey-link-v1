import { Injectable } from '@nestjs/common'
import { ApiUserAdminService } from './api-user-admin.service'
import { ApiUserUserService } from './api-user-user.service'

@Injectable()
export class ApiUserService {
  constructor(readonly admin: ApiUserAdminService, readonly user: ApiUserUserService) {}
}
