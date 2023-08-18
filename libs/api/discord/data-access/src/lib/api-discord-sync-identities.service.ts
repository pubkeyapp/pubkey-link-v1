import { Injectable, Logger } from '@nestjs/common'
import { Cron } from '@nestjs/schedule'
import { IdentityProvider } from '@prisma/client'
import { ApiCoreService } from '@pubkey-link/api/core/data-access'
import { env } from 'node:process'
import { ApiDiscordBotService } from './api-discord-bot.service'

@Injectable()
export class ApiDiscordSyncIdentitiesService {
  private readonly logger = new Logger(ApiDiscordSyncIdentitiesService.name)

  constructor(private readonly core: ApiCoreService, private readonly bot: ApiDiscordBotService) {}

  @Cron(env['SYNC_DISCORD_IDENTITIES'] as string)
  async syncDiscordIdentities() {
    const tag = `syncDiscordIdentities`
    if (!this.core.config.syncActive) {
      this.logger.verbose(`${tag}: syncActive is false, skipping`)
      return
    }
    await this.debugLog(`${tag} processing...`, true)
    const identities = await this.core.data.identity.findMany({
      where: { provider: IdentityProvider.Discord },
      include: { owner: true },
    })

    for (const identity of identities) {
      const user = await this.bot.client.users.fetch(identity.providerId)
      if (!user) {
        if (identity.verified) {
          await this.core.data.identity.update({
            where: { id: identity.id },
            data: { verified: false },
          })
          await this.debugLog(`Unverified Discord Identity ${identity.providerId} (${identity.owner?.username})`)
        }
        continue
      }

      await this.core.data.identity.update({
        where: { id: identity.id },
        data: {
          profile: {
            ...JSON.parse(JSON.stringify(user)),
            avatarUrl: user.avatarURL({ size: 128, extension: 'png' }),
          },
          verified: true,
        },
      })
      this.logger.verbose(`Synced Discord Identity ${identity.providerId} (${user.username})`)
      await this.debugLog(`Synced Discord Identity ${identity.providerId} (${user.username})`)
    }
    await this.debugLog(`${tag} done`, true)
  }

  private async debugLog(message: string, always = false) {
    if (!this.core.config.syncDebug && !always) return
    this.logger.debug(message)
    await this.bot.sendCommandChannel(`\`${new Date().toISOString()}${always ? '' : ' DEBUG'}: ${message}\``)
  }
}
