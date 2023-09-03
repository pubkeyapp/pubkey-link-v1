import { Injectable } from '@nestjs/common'
import { IdentityProvider } from '@prisma/client'
import { ApiCoreService } from '@pubkey-link/api/core/data-access'
import { ApiDiscordService } from '@pubkey-link/api/discord/data-access'
import { AdminReportDiscordMemberWalletsInput } from './dto/admin-report-discord-member-wallets.input'

@Injectable()
export class ApiReportAdminService {
  constructor(private readonly core: ApiCoreService, private readonly discord: ApiDiscordService) {}

  async reportDiscordMemberWallets(userId: string, input: AdminReportDiscordMemberWalletsInput) {
    await this.core.ensureUserAdmin(userId)
    const server = await this.core.data.discordServer.findUnique({
      where: { id: input.serverId },
    })
    if (!server) {
      throw new Error(`Server not found`)
    }

    const members = await this.discord.bot.getDiscordGuildMembers(input.serverId)

    const memberInfo = members
      .map(({ user }) => ({ id: user.id, username: user.username }))
      .sort((a, b) => a.username.localeCompare(b.username))

    const memberIds = memberInfo.map(({ id }) => id)

    const memberWallets = await this.core.data.user.findMany({
      where: {
        identities: {
          some: {
            provider: IdentityProvider.Discord,
            providerId: {
              in: memberIds,
            },
          },
        },
      },
      include: {
        identities: {
          select: {
            provider: true,
            providerId: true,
            assets: {
              where: {
                collectionAccount: input.collectionAccount ? { equals: input.collectionAccount } : undefined,
              },
              select: {
                account: true,
                attributeMap: true,
                collectionAccount: true,
                image: true,
                name: true,
              },
            },
          },
        },
      },
    })

    return {
      server: server.name,
      members: memberInfo.map(({ id, username }) => ({
        id,
        username,
        identities: memberWallets.find((w) => w.identities.some((i) => i.providerId === id))?.identities,
      })),
    }
  }
}
