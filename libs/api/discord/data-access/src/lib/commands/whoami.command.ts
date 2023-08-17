import { Injectable } from '@nestjs/common'
import { IdentityProvider } from '@prisma/client'
import { ApiCoreService } from '@pubkey-link/api/core/data-access'
import { Context, SlashCommand, SlashCommandContext } from 'necord'

@Injectable()
export class WhoamiCommand {
  constructor(private readonly core: ApiCoreService) {}
  @SlashCommand({ name: 'whoami', description: 'Who am I?' })
  async onPing(@Context() [interaction]: SlashCommandContext) {
    const find = await this.core.getUserByProviderId(IdentityProvider.Discord, interaction.user.id)
    if (!find) {
      return interaction.reply({ content: 'You are not registered.' })
    }
    return interaction.reply({ content: `You are ${find.username} on PubKey` })
  }
}
