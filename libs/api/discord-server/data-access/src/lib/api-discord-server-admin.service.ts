import { Injectable, Logger } from '@nestjs/common'
import { DiscordServer as PrismaDiscordServer } from '@prisma/client'

import { ApiCoreService, Paging } from '@pubkey-link/api/core/data-access'
import { AdminFindDiscordServersInput } from './dto/admin-find-discord-servers.input'
import { AdminUpdateDiscordServerInput } from './dto/admin-update-discord-server.input'
import { parseAdminFindDiscordServersInput } from './helpers/parse-admin-find-discord-servers.input'

@Injectable()
export class ApiDiscordServerAdminService {
  private readonly logger = new Logger(ApiDiscordServerAdminService.name)

  constructor(private readonly core: ApiCoreService) {}

  async findDiscordServers(adminId: string, input: AdminFindDiscordServersInput): Promise<PrismaDiscordServer[]> {
    await this.core.ensureUserAdmin(adminId)

    const { where, orderBy, take, skip, include } = parseAdminFindDiscordServersInput(input)
    const items = await this.core.data.discordServer.findMany({ where, orderBy, take, skip, include })

    return items ?? []
  }

  async findDiscordServersCount(adminId: string, input: AdminFindDiscordServersInput): Promise<Paging> {
    await this.core.ensureUserAdmin(adminId)

    const { where, orderBy, take, skip } = parseAdminFindDiscordServersInput(input)
    const [count, total] = await Promise.all([
      this.core.data.discordServer.count({ where, orderBy, take, skip }),
      this.core.data.discordServer.count({ where, orderBy }),
    ])

    return { count, skip, take, total }
  }

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

  async createDiscordRoleCondition(adminId: string, roleId: string) {
    await this.core.ensureUserAdmin(adminId)
    const created = await this.core.data.discordRoleCondition.create({
      data: {
        roleId,
      },
    })
    return !!created
  }

  async addDiscordRoleConditionCollection(adminId: string, conditionId: string, collectionId: string) {
    await this.core.ensureUserAdmin(adminId)
    const updated = await this.core.data.discordRoleCondition.update({
      where: { id: conditionId },
      data: {
        collections: {
          connect: {
            id: collectionId,
          },
        },
      },
    })
    return !!updated
  }

  async addDiscordRoleConditionCombo(adminId: string, conditionId: string, comboId: string) {
    await this.core.ensureUserAdmin(adminId)
    const updated = await this.core.data.discordRoleCondition.update({
      where: { id: conditionId },
      data: {
        combos: {
          connect: {
            id: comboId,
          },
        },
      },
    })
    return !!updated
  }

  async removeDiscordRoleConditionCombo(adminId: string, conditionId: string, comboId: string) {
    await this.core.ensureUserAdmin(adminId)
    const updated = await this.core.data.discordRoleCondition.update({
      where: { id: conditionId },
      data: {
        combos: {
          disconnect: {
            id: comboId,
          },
        },
      },
    })
    return !!updated
  }

  async deleteDiscordRoleCondition(adminId: string, conditionId: string) {
    await this.core.ensureUserAdmin(adminId)
    const deleted = await this.core.data.discordRoleCondition.delete({
      where: { id: conditionId },
    })
    return !!deleted
  }

  async removeDiscordRoleConditionCollection(adminId: string, conditionId: string, collectionId: string) {
    await this.core.ensureUserAdmin(adminId)
    const updated = await this.core.data.discordRoleCondition.update({
      where: { id: conditionId },
      data: {
        collections: { disconnect: { id: collectionId } },
      },
    })
    return !!updated
  }

  async syncDiscordRoles(adminId: string, serverId: string) {
    await this.core.ensureUserAdmin(adminId)

    throw new Error('Not implemented')
  }

  async updateDiscordServer(
    adminId: string,
    serverId: string,
    input: AdminUpdateDiscordServerInput,
  ): Promise<PrismaDiscordServer> {
    await this.core.ensureUserAdmin(adminId)
    const found = await this.core.data.discordServer.findUnique({ where: { id: serverId } })
    if (!found) {
      throw new Error(`DiscordServer ${serverId} not found`)
    }
    const updated = await this.core.data.discordServer.update({
      where: { id: serverId },
      data: { ...input },
    })
    if (!updated) {
      throw new Error(`DiscordServer ${serverId} not updated`)
    }
    return updated
  }
}
