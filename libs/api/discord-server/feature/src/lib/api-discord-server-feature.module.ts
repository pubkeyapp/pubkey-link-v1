import { Module } from '@nestjs/common'
import { ApiDiscordServerDataAccessModule } from '@pubkey-link/api/discord-server/data-access'
import { ApiDiscordServerAdminResolver } from './api-discord-server-admin-resolver'
import { ApiDiscordServerFieldResolver } from './api-discord-server-field-resolver'
import { ApiDiscordServerUserResolver } from './api-discord-server-user-resolver'

@Module({
  imports: [ApiDiscordServerDataAccessModule],
  providers: [ApiDiscordServerAdminResolver, ApiDiscordServerFieldResolver, ApiDiscordServerUserResolver],
})
export class ApiDiscordServerFeatureModule {}
