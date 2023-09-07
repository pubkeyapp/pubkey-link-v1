import { Injectable, Logger } from '@nestjs/common'
import { Cron } from '@nestjs/schedule'
import { Prisma } from '@prisma/client'
import { ApiCoreService } from '@pubkey-link/api/core/data-access'
import { env } from 'node:process'
import { ApiDiscordBotService } from './api-discord-bot.service'

@Injectable()
export class ApiDiscordSyncBotServersService {
  private readonly logger = new Logger(ApiDiscordSyncBotServersService.name)

  constructor(private readonly core: ApiCoreService, private readonly bot: ApiDiscordBotService) {}

  @Cron(env['SYNC_BOT_SERVERS'] as string)
  async syncBotServers() {
    if (!this.core.config.syncActive) {
      this.logger.verbose(`syncBotServers: syncActive is false, skipping`)
      return
    }
    const [botServers, databaseServers] = await Promise.all([
      this.bot.getBotServers(),
      this.core.data.discordServer.findMany(),
    ])

    const botServerIds = botServers.map((server) => server.id)
    const activeServerIds = databaseServers
      .filter((server) => server.enabled)
      .filter((server) => server.enableSync)
      .map((server) => server.id)
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

    await this.core.upsertDiscordServer(server)

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
    await this.core.upsertDiscordRoles(server.id, formatted)
  }
}
