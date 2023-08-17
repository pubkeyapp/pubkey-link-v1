import { Injectable } from '@nestjs/common'
import { Context, Options, SlashCommand, SlashCommandContext, StringOption } from 'necord'
import { ApiDiscordService } from '../api-discord.service'

export class SyncDto {
  @StringOption({
    name: 'guild',
    description: 'The guild ID',
    required: false,
  })
  guildId?: string
}

@Injectable()
export class SyncCommand {
  constructor(private readonly discord: ApiDiscordService) {}

  @SlashCommand({ name: 'sync', description: 'Sync the guild' })
  async sync(@Context() [interaction]: SlashCommandContext, @Options() { guildId }: SyncDto) {
    guildId = guildId ?? interaction.guild?.id

    if (!guildId) {
      return interaction.reply({ content: 'Something went wrong fetching the guild.' })
    }

    await interaction.reply(`⏱️ Syncing guild ${guildId}...`)

    await this.discord.bot.sendCommandChannel(`⏱️ Syncing guild ${guildId}... identities...`)
    // await this.identity.syncIdentities()

    await this.discord.bot.sendCommandChannel(`⏱️ Syncing guild ${guildId}... server...`)
    await this.discord.syncServers.syncServer(guildId)

    await this.discord.bot.sendCommandChannel(`⏱️ Syncing guild ${guildId}... Discord server roles...`)
    await this.discord.syncServerRoles.syncDiscordServerRoles(guildId)

    await this.discord.bot.sendCommandChannel(`⏱️ Syncing guild ${guildId}... Discord identities...`)
    await this.discord.syncIdentities.syncDiscordIdentities()

    await this.discord.bot.sendCommandChannel(`✅  Synced guild ${guildId}!`)
    return
  }
}
