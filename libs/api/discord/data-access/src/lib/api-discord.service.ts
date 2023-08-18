import { Injectable } from '@nestjs/common'
import { ApiDiscordAdminService } from './api-discord-admin.service'
import { ApiDiscordBotService } from './api-discord-bot.service'
import { ApiDiscordSyncIdentitiesService } from './api-discord-sync-identities.service'
import { ApiDiscordSyncServerRolesService } from './api-discord-sync-server-roles.service'
import { ApiDiscordSyncBotServersService } from './api-discord-sync-bot-servers.service'

@Injectable()
export class ApiDiscordService {
  constructor(
    readonly bot: ApiDiscordBotService,
    readonly admin: ApiDiscordAdminService,
    readonly syncIdentities: ApiDiscordSyncIdentitiesService,
    readonly syncServers: ApiDiscordSyncBotServersService,
    readonly syncServerRoles: ApiDiscordSyncServerRolesService,
  ) {}
}
