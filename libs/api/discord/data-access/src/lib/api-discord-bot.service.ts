import { Injectable, Logger } from '@nestjs/common'
import { DiscordRole, DiscordServer } from '@prisma/client'
import { ApiCoreService } from '@pubkey-link/api/core/data-access'
import { ActivityType, Client, Guild, GuildMember, REST } from 'discord.js'
import { Context, ContextOf, On, Once } from 'necord'

@Injectable()
export class ApiDiscordBotService {
  private readonly logger = new Logger(ApiDiscordBotService.name)
  private readonly rest = new REST({ version: '10' })
  constructor(private readonly core: ApiCoreService, readonly client: Client) {
    this.rest.setToken(this.core.config.discordBotToken as string)
  }

  @Once('ready')
  async onReady(@Context() [client]: ContextOf<'ready'>) {
    this.logger.verbose(`Bot logged in as ${client.user.username}`)
    this.logger.verbose(`Bot synced servers`)

    client.user.setPresence({ activities: [{ type: ActivityType.Watching, name: 'YOU 👀 on Solana' }] })
    const channel = this.ensureCommandChannel()
    this.logger.verbose(`Found bot command channel: ${channel?.url}`)

    this.logger.verbose(`Bot Invite url: ${this.inviteUrl()}`)
  }

  @On('warn')
  onWarn(@Context() [message]: ContextOf<'warn'>) {
    this.logger.warn(message)
  }

  async addRoleToUser(server: DiscordServer, role: DiscordRole, providerId: string) {
    const tag = `addRoleToUser [${server.name}] => [${role.name}] ->`
    this.logger.verbose(`${tag} Fetching discord guild member, id: ${providerId}`)

    const member = await this.client.guilds.cache.get(server.id)?.members.fetch(providerId)

    if (!member) {
      this.logger.warn(`${tag} Discord guild member not found, skipping`)
      return
    }

    const roles = member?.roles.cache.map((r) => r.id) ?? []

    if (roles.includes(role.id)) {
      this.logger.debug(`${tag} User ${member?.user.username} already has role, skipping`)
      return
    }

    this.logger.verbose(`${tag} Adding role to user ${member?.user?.username}`)

    if (this.core.config.syncDryRun) {
      this.logger.log(`${tag} Skipping because of syncDryRun`)
      await this.sendCommandChannel(
        `In server \`${server.name}\`, user \`${member.user.username}\` received role \`${role.name}\` (dry run).`,
      )
      return
    }
    await member?.roles.add(role.id)

    this.logger.verbose(`${tag} Role added to user ${member?.user?.username}`)

    if (server.botChannel) {
      await this.sendChannel(server.botChannel, `Role <@&${role.id}> added to user <@${member?.user?.id}>`)
    }

    if (this.core.config.discordBotCommandId !== server.botChannel) {
      await this.sendCommandChannel(
        `In server \`${server.name}\`, user \`${member.user.username}\` received role \`${role.name}\`.`,
      )
    }
  }

  ensureCommandChannel() {
    const channelId = this.core.config.discordBotCommandId as string
    return this.ensureChannel(channelId)
  }

  ensureChannel(channelId: string) {
    const found = this.client.channels.cache.get(channelId)

    if (!found) {
      throw new Error('Channel not found')
    }
    return found
  }

  private async ensureDiscordGuild(guildId: string) {
    const fetched = await this.client.guilds.fetch(guildId)
    if (!fetched) {
      throw new Error(`Could not fetch guild with id ${guildId}`)
    }
    return fetched
  }

  async sendCommandChannel(content: string) {
    await this.sendChannel(this.core.config.discordBotCommandId as string, content)
  }

  async sendChannel(channelId: string, content: string) {
    const channel = this.ensureChannel(channelId)
    if (channel.isTextBased()) {
      await channel.send({ content })
    }
  }

  async getDiscordGuildMemberIds(guildId: string) {
    const guild = await this.ensureDiscordGuild(guildId)
    const members = await this.getEachMember(guild)
    return members.map((member) => member.user.id)
  }

  async getBotServers(): Promise<DiscordGuild[]> {
    const servers = await this.rest.get('/users/@me/guilds')

    return servers as DiscordGuild[]
  }

  async getBotServer(guildId: string): Promise<DiscordGuild> {
    const server = await this.rest.get(`/guilds/${guildId}`)

    return server as DiscordGuild
  }

  async getBotServerRoles(serverId: string): Promise<DiscordGuildRole[]> {
    const roles = await this.rest.get(`/guilds/${serverId}/roles`)

    return roles as DiscordGuildRole[]
  }

  private async getEachMember(guild: Guild): Promise<GuildMember[]> {
    const limit = 1000
    const result: GuildMember[] = []
    let after: string | undefined
    let batches = 0
    let count = 0
    let done = false

    while (!done) {
      const members = await guild.members.list({ limit, after })

      if (members.size === 0) {
        done = true
        break
      }

      batches++
      result.push(...members.values())
      after = members.last()?.id
      count += members.size
    }

    this.logger.verbose(`In ${guild.name}, I found ${count} members in ${batches} batches`)

    return result
  }

  async getInviteUrl(userId: string) {
    await this.core.ensureUserAdmin(userId)
    if (!this.client?.user) {
      throw new Error('Client not ready')
    }
    return this.inviteUrl()
  }

  inviteUrl() {
    if (!this.client?.user) {
      throw new Error('Client not ready')
    }
    return `https://discord.com/api/oauth2/authorize?client_id=${this.client.user.id}&permissions=${this.core.config.discordBotPermissions}&scope=bot%20applications.commands`
  }
}

export interface DiscordGuild {
  id: string
  name: string
  icon: string
  description: string
  owner_id: string
  region: string
  roles: DiscordGuildRole[]
}

export interface DiscordGuildRole {
  id: string
  name: string
  description?: string
  permissions: string
  position: number
  color: number
  hoist: boolean
  managed: boolean
  mentionable: boolean
  icon?: string
  unicode_emoji?: string
  flags: number
  tags?: DiscordGuildRoleTag
}

export interface DiscordGuildRoleTag {
  bot_id: string
}
