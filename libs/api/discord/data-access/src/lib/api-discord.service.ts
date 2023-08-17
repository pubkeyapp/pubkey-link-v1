import { Injectable } from '@nestjs/common'
import { ApiDiscordAdminService } from './api-discord-admin.service'
import { ApiDiscordBotService } from './api-discord-bot.service'
import { ApiDiscordSyncIdentitiesService } from './api-discord-sync-identities.service'
import { ApiDiscordSyncServerRolesService } from './api-discord-sync-server-roles.service'
import { ApiDiscordSyncServersService } from './api-discord-sync-servers.service'

@Injectable()
export class ApiDiscordService {
  constructor(
    readonly bot: ApiDiscordBotService,
    readonly admin: ApiDiscordAdminService,
    readonly syncIdentities: ApiDiscordSyncIdentitiesService,
    readonly syncServers: ApiDiscordSyncServersService,
    readonly syncServerRoles: ApiDiscordSyncServerRolesService,
  ) {}
}
