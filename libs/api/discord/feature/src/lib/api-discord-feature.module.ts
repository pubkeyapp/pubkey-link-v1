import { Module } from '@nestjs/common'
import { ApiDiscordDataAccessModule } from '@pubkey-link/api/discord/data-access'
import { ApiDiscordAdminResolver } from './api-discord-admin-resolver'

@Module({
  imports: [ApiDiscordDataAccessModule],
  providers: [ApiDiscordAdminResolver],
})
export class ApiDiscordFeatureModule {}
