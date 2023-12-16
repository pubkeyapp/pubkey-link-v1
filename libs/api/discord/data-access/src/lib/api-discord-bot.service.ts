import { Injectable, Logger } from '@nestjs/common'
import { DiscordServer } from '@prisma/client'
import { ApiCoreService } from '@pubkey-link/api/core/data-access'
import { ActivityType, Client, Guild, GuildMember, REST } from 'discord.js'
import { Context, ContextOf, On, Once } from 'necord'
import { DiscordGuild } from './entity/discord-guild'
import { UserRoleChanges } from './entity/user-role-types'

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
    try {
      const channel = this.ensureCommandChannel()
      this.logger.verbose(`Found bot command channel: ${channel?.url}`)
    } catch (error) {
      this.logger.error(`Bot command channel not found`)
      this.logger.error(error)
    }

    this.logger.verbose(`Bot Invite url: ${this.inviteUrl()}`)
  }

  @On('warn')
  onWarn(@Context() [message]: ContextOf<'warn'>) {
    this.logger.warn(message)
  }

  async syncUserRoles(
    server: DiscordServer,
    changes: UserRoleChanges[],
    { roleMap, userMap }: { roleMap: Record<string, string>; userMap: Record<string, string> },
  ) {
    const tag = `syncUserRoles [${server.name}] =>`

    for (const { toAdd, toRemove, userId } of changes) {
      const member = await this.client.guilds.cache.get(server.id)?.members.fetch(userId)

      if (!member) {
        await this.debugLog(`${tag} Discord guild member not found, skipping`, true)
        return
      }

      for (const roleId of toAdd) {
        await member?.roles.add(roleId)
        await Promise.all([
          this.debugLog(`${tag} Added role ${roleMap[roleId]} to user ${userMap[userId]}`, true),
          this.announceInServer(server, `🥳 Role <@&${roleId}> added to user <@${userId}>`),
        ])
      }

      for (const roleId of toRemove) {
        await member?.roles.remove(roleId)
        await Promise.all([
          this.debugLog(`${tag} Removed role ${roleMap[roleId]} from user ${userMap[userId]}`, true),
          this.announceInServer(server, `😭 Role <@&${roleId}> removed from user <@${userId}>`),
        ])
      }
    }
  }

  async debugLog(message: string, always = false) {
    if (!this.core.config.syncDebug && !always) return
    this.logger.debug(message)
    await this.sendCommandChannel(`\`${new Date().toISOString()}${always ? '' : ' DEBUG'}: ${message}\``)
  }

  async announceInServer(server: DiscordServer, content: string) {
    if (!server.botChannel) {
      return
    }
    await this.sendChannel(server.botChannel, content)
  }

  async getDiscordGuildMembers(guildId: string) {
    const guild = await this.ensureDiscordGuild(guildId)
    const members = await this.getEachMember(guild)
    return members.map((member) => member)
  }

  async getBotServers(): Promise<DiscordGuild[]> {
    const servers = await this.rest.get('/users/@me/guilds')

    return servers as DiscordGuild[]
  }

  async getBotServer(guildId: string): Promise<DiscordGuild> {
    const server = await this.rest.get(`/guilds/${guildId}`)

    return server as DiscordGuild
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

  private ensureChannel(channelId: string) {
    const found = this.client.channels.cache.get(channelId)

    if (!found) {
      throw new Error('Channel not found')
    }
    return found
  }

  private ensureCommandChannel() {
    const channelId = this.core.config.discordBotCommandId as string
    return this.ensureChannel(channelId)
  }

  private async ensureDiscordGuild(guildId: string) {
    const fetched = await this.client.guilds.fetch(guildId)
    if (!fetched) {
      throw new Error(`Could not fetch guild with id ${guildId}`)
    }
    return fetched
  }

  private sendCommandChannel(content: string) {
    return this.sendChannel(this.core.config.discordBotCommandId as string, content)
  }

  private async sendChannel(channelId: string, content: string) {
    const channel = this.ensureChannel(channelId)
    if (channel.isTextBased()) {
      await channel.send({ content })
    }
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

  async createRole({ serverId, name }: { name: string; serverId: string }) {
    const server = await this.ensureDiscordGuild(serverId)

    return await server.roles.create({ name })
  }

  async deleteRole({ roleId, serverId }: { roleId: string; serverId: string }) {
    const server = await this.ensureDiscordGuild(serverId)
    const role = server.roles.cache.get(roleId)
    if (!role) {
      throw new Error(`Role not found`)
    }
    await role.delete()
    return true
  }
}
