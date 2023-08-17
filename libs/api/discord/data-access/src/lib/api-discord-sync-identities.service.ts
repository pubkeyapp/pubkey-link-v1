import { Injectable, Logger } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import { IdentityProvider } from '@prisma/client'
import { ApiCoreService } from '@pubkey-link/api/core/data-access'
import { ApiDiscordBotService } from './api-discord-bot.service'

@Injectable()
export class ApiDiscordSyncIdentitiesService {
  private readonly logger = new Logger(ApiDiscordSyncIdentitiesService.name)

  constructor(private readonly core: ApiCoreService, private readonly bot: ApiDiscordBotService) {}

  @Cron(CronExpression.EVERY_2_HOURS)
  async syncDiscordIdentities() {
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
          this.logger.verbose(`Unverified Discord Identity ${identity.providerId} (${identity.owner?.username})`)
          await this.bot.sendCommandChannel(
            `Unverified Discord Identity ${identity.providerId} (${identity.owner?.username})`,
          )
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
      await this.bot.sendCommandChannel(`Synced Discord Identity ${identity.providerId} (${user.username})`)
    }
  }
}
