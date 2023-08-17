import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { Prisma, UserStatus } from '@prisma/client'
import {
  fakeUsers,
  provisionCombos,
  provisionDiscordServers,
  provisionNetworks,
  provisionUsers,
} from './api-core-provision-data'
import { hashPassword, slugifyId } from './api-core.helpers'
import { ApiCoreService } from './api-core.service'

@Injectable()
export class ApiCoreProvisionService implements OnModuleInit {
  private readonly logger = new Logger(ApiCoreProvisionService.name)

  constructor(private readonly core: ApiCoreService) {}

  async onModuleInit() {
    if (this.core.config.databaseReset) {
      await this.resetDatabase()
      this.logger.verbose(`Reset database`)
    }
    if (this.core.config.databaseProvision) {
      await this.provisionDatabase()
      this.logger.verbose(`Provisioned database`)
    }
    if (this.core.config.databaseReset && this.core.config.databaseRandomData) {
      await this.generateRandomData()
      this.logger.verbose(`Generated random data`)
    }
  }

  private async generateRandomData() {
    await Promise.all(fakeUsers(42).map((user) => this.provisionUser(user)))
  }

  private async provisionDatabase() {
    await this.provisionNetworks()
    await this.provisionCollectionCombos()
    await this.provisionDiscordServers()
    await this.provisionUsers()
  }

  private async provisionCollectionCombos() {
    await Promise.all(provisionCombos.map((combo) => this.provisionCollectionCombo(combo)))
  }

  private async provisionCollectionCombo(input: Prisma.CollectionComboCreateInput) {
    const existing = await this.core.data.collectionCombo.count({ where: { id: input.id } })
    if (existing < 1) {
      this.logger.verbose(`Creating collectionCombo (${input.id}) name = ${input.name}`)
      await this.core.data.collectionCombo.create({
        data: { ...input },
      })
      this.logger.verbose(`Provisioned (${input.id}) name = ${input.name}`)
      return
    }
    this.logger.verbose(`Found collectionCombo (${input.id}) name = ${input.name}`)
  }
  private async provisionDiscordServers() {
    await Promise.all(provisionDiscordServers.map((server) => this.provisionDiscordServer(server)))
  }

  private async provisionDiscordServer(input: Prisma.DiscordServerCreateInput) {
    const existing = await this.core.data.discordServer.count({ where: { id: input.id } })
    if (existing < 1) {
      this.logger.verbose(`Creating discordServer (${input.id}) name = ${input.name}`)
      await this.core.data.discordServer.create({
        data: { ...input },
      })
      this.logger.verbose(`Provisioned (${input.id}) name = ${input.name}`)
      return
    }
    this.logger.verbose(`Found discordServer (${input.id}) name = ${input.name}`)
  }

  private async provisionNetworks() {
    await Promise.all(provisionNetworks.map((network) => this.provisionNetwork(network)))
  }

  private async provisionNetwork(input: Prisma.NetworkCreateInput) {
    const existing = await this.core.data.network.count({ where: { type: input.type } })
    if (existing < 1) {
      this.logger.verbose(`Creating network (${input.type}) name = ${input.name}, endpoint = ${input.endpoint}`)
      await this.core.data.network.create({
        data: { ...input },
      })
      this.logger.verbose(`Provisioned (${input.type}) name = ${input.name}, endpoint = ${input.endpoint}`)
      return
    }
    this.logger.verbose(`Found network (${input.type}) name = ${input.name}, endpoint = ${input.endpoint}`)
  }

  private async provisionUsers() {
    await Promise.all(provisionUsers.map((user) => this.provisionUser(user)))
  }

  private async provisionUser(input: Prisma.UserCreateInput) {
    const username = slugifyId(input.username)
    const existing = await this.core.data.user.count({ where: { username } })
    if (existing < 1) {
      await this.core.data.user.create({
        data: {
          ...input,
          emails: { create: { email: `${username}@pubkey-link.dev` } },
          id: username,
          password: input.password ? hashPassword(input.password) : undefined,
          status: input.status ?? UserStatus.Active,
        },
      })
      this.logger.verbose(
        `Provisioned ${input.role} ${input.username} ${input.password ? 'and password' : 'and external provider'}`,
      )
      return
    }
    this.logger.verbose(
      `Log in with ${input.role} ${input.username} ${input.password ? 'and password' : 'an external provider'}`,
    )
  }

  private async resetDatabase() {
    await this.core.data.network.deleteMany()
    await this.core.data.identity.deleteMany()
    await this.core.data.email.deleteMany()
    await this.core.data.user.deleteMany()
  }
}
