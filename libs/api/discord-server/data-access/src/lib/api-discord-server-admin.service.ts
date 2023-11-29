import { Injectable } from '@nestjs/common'
import { DiscordServer as PrismaDiscordServer } from '@prisma/client'
import { ApiCoreService } from '@pubkey-link/api/core/data-access'

import { ApiDiscordService } from '@pubkey-link/api/discord/data-access'
import { AdminFindManyDiscordServerInput } from './dto/admin-find-many-discord-server-input'
import { AdminUpdateDiscordServerInput } from './dto/admin-update-discord-server.input'
import { DiscordServerPaging } from './entity/discord-server-paging'
import { getAdminDiscordServerInput } from './helpers/get-admin-discord-server-input'
import { AdminCreateDiscordRoleInput } from './dto/admin-create-discord-role.input'
import { AdminDeleteDiscordRoleInput } from './dto/admin-delete-discord-role-input'

@Injectable()
export class ApiDiscordServerAdminService {
  constructor(private readonly core: ApiCoreService, private readonly discord: ApiDiscordService) {}

  async findManyDiscordServer(adminId: string, input: AdminFindManyDiscordServerInput): Promise<DiscordServerPaging> {
    await this.core.ensureUserAdmin(adminId)

    return this.core.data.discordServer
      .paginate({
        include: { roles: true },
        orderBy: { name: 'asc' },
        where: getAdminDiscordServerInput(input),
      })
      .withPages({ limit: input.limit, page: input.page })
      .then(([data, meta]) => ({ data, meta }))
  }

  async findOneDiscordServer(userId: string, serverId: string) {
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

  async createDiscordRole(adminId: string, input: AdminCreateDiscordRoleInput) {
    await this.core.ensureUserAdmin(adminId)
    const created = await this.discord.bot.createRole({ serverId: input.serverId, name: input.name })
    if (!created) {
      throw new Error(`Could not create role`)
    }
    await this.discord.syncServers.syncServer(input.serverId)
    return true
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

  async deleteDiscordRole(adminId: string, input: AdminDeleteDiscordRoleInput) {
    await this.core.ensureUserAdmin(adminId)
    const created = await this.discord.bot.deleteRole({ serverId: input.serverId, roleId: input.roleId })
    if (!created) {
      throw new Error(`Could not delete role`)
    }
    await this.discord.syncServers.syncServer(input.serverId)
    return true
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
    await this.discord.syncServers.syncServer(serverId)
    return true
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
