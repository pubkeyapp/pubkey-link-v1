import { Injectable, Logger } from '@nestjs/common'
import { ApiCoreService } from '@pubkey-link/api/core/data-access'
import { ApiDiscordBotService } from './api-discord-bot.service'

@Injectable()
export class ApiDiscordAdminService {
  private readonly logger = new Logger(ApiDiscordAdminService.name)

  constructor(private readonly core: ApiCoreService, private readonly bot: ApiDiscordBotService) {}

  async getDiscordServer(userId: string, serverId: string) {
    await this.core.ensureUserAdmin(userId)

    return this.core.data.discordServer.findUnique({
      where: { id: serverId },
      include: {
        roles: {
          orderBy: { position: 'desc' },
          include: {
            conditions: {
              include: {
                collections: {
                  include: {
                    combos: {
                      include: { attributes: true },
                    },
                  },
                },
                combos: {
                  include: { attributes: true },
                },
              },
            },
          },
        },
      },
    })
  }

  async testDiscordServerBotChannel(adminId: string, serverId: string) {
    const admin = await this.core.ensureUserAdmin(adminId)
    const server = await this.getDiscordServer(adminId, serverId)
    if (!server) {
      throw new Error(`DiscordServer ${serverId} not found`)
    }
    if (!server.botChannel) {
      throw new Error(`DiscordServer ${serverId} has no bot channel`)
    }

    try {
      this.logger.verbose(`Sending test message to server ${server.name} triggered by ${admin.username}`)
      await this.bot.announceInServer(server, `Test message for server ${server.name} triggered by ${admin.username}`)
    } catch (error) {
      this.logger.error(`Error sending test message to server ${server.name} triggered by ${admin.username}: ${error}`)
      throw error
    }
  }

  async getDiscordServerChannels(adminId: string, serverId: string) {
    await this.core.ensureUserAdmin(adminId)

    const channels = this.bot.client.guilds.cache.get(serverId)?.channels.cache.map((c) => ({
      id: c.id,
      name: c.name,
      type: c.type,
    }))

    return channels ?? []
  }
}
