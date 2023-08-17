import { Injectable } from '@nestjs/common'
import { ApiCoreService } from '@pubkey-link/api/core/data-access'
import { EmbedBuilder } from 'discord.js'
import { Context, Options, SlashCommand, SlashCommandContext, StringOption } from 'necord'

export class ConfigDto {
  @StringOption({
    name: 'guild',
    description: 'The guild ID',
    required: false,
  })
  guildId?: string
}

@Injectable()
export class ConfigCommand {
  constructor(private readonly core: ApiCoreService) {}
  @SlashCommand({ name: 'config', description: 'Show the config.' })
  async config(@Context() [interaction]: SlashCommandContext, @Options() { guildId }: ConfigDto) {
    const guild = guildId ?? interaction.guild?.id
    if (!guild) {
      return interaction.reply({ content: 'Something went wrong fetching the guild.' })
    }
    const server = await this.core.data.discordServer.findUnique({
      where: { id: guild },
      include: {
        roles: {
          // Get only the roles that have a condition
          where: { conditions: { some: {} } },
          include: {
            conditions: {
              where: {
                OR: [
                  // Get only the conditions that have a collection or combo
                  { collections: { some: {} } },
                  { combos: { some: {} } },
                ],
              },
              include: {
                collections: true,
                combos: true,
              },
            },
          },
          orderBy: { position: 'asc' },
        },
      },
    })
    if (!server) {
      return interaction.reply({ content: `Can't find server with id ${guild} in the database.` })
    }

    return interaction.reply({
      content: `Config for ${server.name}`,
      embeds: [
        new EmbedBuilder().setTitle('Roles').addFields([
          ...server.roles.map((role) => {
            const conditionSummary = role.conditions.map((condition) => {
              const collections = condition.collections.map((collection) => collection.name).join(', ')
              const combos = condition.combos.map((combo) => combo.name).join(', ')
              return [
                `Collections: ${collections.length ? collections : 'None'}`,
                `Combos: ${combos.length ? combos : 'None'}`,
              ].join(', ')
            })
            return {
              name: role.name,
              value: `Conditions: ${role.conditions.length} (${conditionSummary})`,
            }
          }),
        ]),
      ],
    })
  }
}
