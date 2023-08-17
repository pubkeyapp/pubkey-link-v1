import { Injectable } from '@nestjs/common'
import { ApiCoreService } from '@pubkey-link/api/core/data-access'
import { EmbedBuilder } from 'discord.js'
import { Context, SlashCommand, SlashCommandContext } from 'necord'

@Injectable()
export class CollectionsCommand {
  constructor(private readonly core: ApiCoreService) {}
  @SlashCommand({ name: 'collections', description: 'Show the collections.' })
  async collections(@Context() [interaction]: SlashCommandContext) {
    const collections = await this.core.data.collection.findMany({
      orderBy: { name: 'asc' },
      include: {
        combos: { include: { attributes: true } },
      },
    })

    return interaction.reply({
      content: 'Collections',
      embeds: [
        ...collections.map((collection) => {
          return new EmbedBuilder()
            .setColor(0x1c7ed6)
            .setTitle(collection.name)
            .addFields(
              ...[
                collection.combos.length
                  ? collection.combos.map((combo) => ({
                      name: combo.name,
                      value: `${combo.attributes.map((att) => att.key + ': ' + att.value).join(', ')}`,
                    }))
                  : [{ name: 'No combos', value: ' ', inline: true }],
              ],
            )
        }),
      ],
    })
  }
}
