import { INestApplication, Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { Prisma, PrismaClient } from '@prisma/client'

@Injectable()
export class ApiCoreDataService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(ApiCoreDataService.name)

  constructor() {
    super()
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close()
      this.logger.verbose(`Disconnected from database`)
    })
  }

  async onModuleInit() {
    await this.$connect()
    this.logger.verbose(`Connected to database`)
  }

  upsertDiscordServer({ id, name, icon }: { id: string; name: string; icon: string }) {
    return this.discordServer.upsert({ where: { id }, create: { id, name, icon }, update: { name, icon } })
  }

  async upsertDiscordRoles(serverId: string, roles: Prisma.DiscordRoleCreateWithoutServerInput[]) {
    const existing = await this.discordRole.findMany({ where: { serverId } })
    const toDelete = existing.filter((role) => !roles.find((r) => r.id === role.id))
    const toCreate = roles.filter((role) => !existing.find((r) => r.id === role.id))
    const toUpdate = roles.filter((role) => existing.find((r) => r.id === role.id))

    if (toDelete.length > 0) this.logger.verbose(`Deleting ${toDelete.length} roles`)
    await this.discordRole.deleteMany({ where: { id: { in: toDelete.map((r) => r.id) } } })

    for (const role of toCreate) {
      this.logger.verbose(`Creating role ${role.name} (${role.id})`)
      await this.discordRole.create({ data: { ...role, server: { connect: { id: serverId } } } })
    }

    await Promise.all(
      toUpdate.map((role) => {
        this.logger.verbose(`Updating role ${role.name} (${role.id})`)
        return this.discordRole.update({
          where: { id: role.id },
          data: { ...role },
        })
      }),
    )
    this.logger.verbose(`Synced ${roles.length} roles`)
  }
}
