import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule, ApiCoreService } from '@pubkey-link/api/core/data-access'
import { NecordModule } from 'necord'
import { ApiDiscordAdminService } from './api-discord-admin.service'
import { ApiDiscordBotService } from './api-discord-bot.service'
import { ApiDiscordSyncIdentitiesService } from './api-discord-sync-identities.service'
import { ApiDiscordSyncServerRolesService } from './api-discord-sync-server-roles.service'
import { ApiDiscordSyncServersService } from './api-discord-sync-servers.service'
import { ApiDiscordService } from './api-discord.service'
import { commands } from './commands'

@Module({
  imports: [
    ApiCoreDataAccessModule,
    NecordModule.forRootAsync({
      imports: [ApiCoreDataAccessModule],
      inject: [ApiCoreService],
      useFactory: (core: ApiCoreService) => ({
        development: core.config.discordDevelopmentIds,
        token: core.config.discordBotToken as string,
        intents: ['Guilds', 'GuildMessages'],
      }),
    }),
  ],
  providers: [
    ...commands,
    ApiDiscordService,
    ApiDiscordAdminService,
    ApiDiscordBotService,
    ApiDiscordSyncIdentitiesService,
    ApiDiscordSyncServerRolesService,
    ApiDiscordSyncServersService,
  ],
  exports: [ApiDiscordService],
})
export class ApiDiscordDataAccessModule {}
