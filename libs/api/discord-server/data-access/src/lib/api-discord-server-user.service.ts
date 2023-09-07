import { Injectable } from '@nestjs/common'
import { IdentityProvider } from '@prisma/client'
import { ApiCoreService } from '@pubkey-link/api/core/data-access'
import { REST, RouteLike } from 'discord.js'
import { DiscordServer } from './entity/discord-server.entity'

@Injectable()
export class ApiDiscordServerUserService {
  constructor(private readonly core: ApiCoreService) {}

  async findManyDiscordServer(userId: string) {
    await this.core.ensureUserActive(userId)
    const [all, user] = await Promise.all([
      this.core.data.discordServer.findMany({
        where: { enabled: true },
        orderBy: { name: 'asc' },
        include: {
          roles: {
            where: { conditions: { some: {} } },
            orderBy: { position: 'desc' },
            include: {
              conditions: {
                include: {
                  collections: true,
                  combos: { include: { attributes: true } },
                },
              },
            },
          },
        },
      }),
      this.fetchUserServers(userId),
    ])

    const filtered = all.filter((server) => user.some((s) => s.id === server.id))

    return filtered ?? []
  }

  async fetchUserServers(userId: string) {
    const res = (await this.makeDiscordApiRequest(userId, '/users/@me/guilds')) as DiscordServer[]
    const items: DiscordServer[] = res ?? []

    return (
      items
        // Sort by name, then by owner
        .sort((a, b) => a.name.localeCompare(b.name))
        .sort((a, b) => (a.owner ? -1 : 1) - (b.owner ? -1 : 1))
    )
  }

  private async makeDiscordApiRequest(userId: string, fullRoute: RouteLike) {
    const api = await this.getDiscordApi(userId)

    return api.get(fullRoute)
  }

  private async getDiscordApi(userId: string) {
    const identity = await this.ensureDiscordIdentity(userId)

    if (!identity.accessToken || !identity.refreshToken) {
      throw new Error('Discord access or refresh tokens not found. Try to login again.')
    }

    return new REST({ authPrefix: 'Bearer', version: '10' }).setToken(identity.accessToken)
  }

  private async ensureDiscordIdentity(userId: string) {
    const found = await this.getDiscordIdentity(userId)
    if (!found) {
      throw new Error('Discord identity not found.')
    }
    return found
  }

  private getDiscordIdentity(userId: string) {
    return this.core.data.identity.findFirst({
      where: {
        ownerId: userId,
        provider: IdentityProvider.Discord,
      },
    })
  }
}
