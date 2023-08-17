import { Injectable, Logger } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import { Prisma } from '@prisma/client'
import { ApiCoreService } from '@pubkey-link/api/core/data-access'
import { ApiDiscordBotService } from './api-discord-bot.service'

@Injectable()
export class ApiDiscordSyncServersService {
  private readonly logger = new Logger(ApiDiscordSyncServersService.name)

  constructor(private readonly core: ApiCoreService, private readonly bot: ApiDiscordBotService) {}

  @Cron(CronExpression.EVERY_5_MINUTES)
  async syncServers() {
    const [botServers, databaseServers] = await Promise.all([
      this.bot.getBotServers(),
      this.core.data.discordServer.findMany(),
    ])

    const botServerIds = botServers.map((server) => server.id)
    const activeServerIds = databaseServers.filter((server) => server.enabled).map((server) => server.id)
    for (const databaseServer of databaseServers) {
      const isEnabled = databaseServer.enabled

      if (isEnabled && !botServerIds.includes(databaseServer.id)) {
        this.logger.verbose(`Disabling server ${databaseServer.id} ${databaseServer.name} as it is not active.`)
        await this.core.data.discordServer.update({ where: { id: databaseServer.id }, data: { enabled: false } })
      } else if (!isEnabled && botServerIds.includes(databaseServer.id)) {
        this.logger.verbose(`Enabling server ${databaseServer.id} ${databaseServer.name} as it is active.`)
        await this.core.data.discordServer.update({ where: { id: databaseServer.id }, data: { enabled: true } })
      }
    }

    for (const activeServerId of activeServerIds) {
      await this.syncServer(activeServerId)
    }
  }

  async syncServer(serverId: string) {
    const server = await this.bot.getBotServer(serverId)
    if (!server) {
      this.logger.warn(`SyncServer => Server ${serverId} not found`)
      return
    }

    this.logger.verbose(`Syncing server ${server.name}`)

    await this.core.data.upsertDiscordServer(server)

    const formatted: Prisma.DiscordRoleCreateWithoutServerInput[] = server.roles.map((role) => {
      return {
        id: role.id,
        name: role.name,
        color: role.color,
        hoist: role.hoist,
        position: role.position,
        permissions: role.permissions,
        managed: role.managed,
        mentionable: role.mentionable,
      }
    })
    await this.core.data.upsertDiscordRoles(server.id, formatted)
  }
}
