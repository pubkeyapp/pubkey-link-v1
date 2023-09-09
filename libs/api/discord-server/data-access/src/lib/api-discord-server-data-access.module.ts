import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@pubkey-link/api/core/data-access'
import { ApiDiscordDataAccessModule } from '@pubkey-link/api/discord/data-access'
import { ApiDiscordServerAdminService } from './api-discord-server-admin.service'
import { ApiDiscordServerUserService } from './api-discord-server-user.service'
import { ApiDiscordServerService } from './api-discord-server.service'

@Module({
  imports: [ApiCoreDataAccessModule, ApiDiscordDataAccessModule],
  providers: [ApiDiscordServerService, ApiDiscordServerAdminService, ApiDiscordServerUserService],
  exports: [ApiDiscordServerService],
})
export class ApiDiscordServerDataAccessModule {}
