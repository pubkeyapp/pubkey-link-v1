import { Injectable } from '@nestjs/common'

import { ApiDiscordServerAdminService } from './api-discord-server-admin.service'
import { ApiDiscordServerUserService } from './api-discord-server-user.service'

@Injectable()
export class ApiDiscordServerService {
  constructor(readonly admin: ApiDiscordServerAdminService, readonly user: ApiDiscordServerUserService) {}
}
