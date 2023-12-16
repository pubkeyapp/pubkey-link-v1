import { Injectable } from '@nestjs/common'
import { ApiCoreService } from '@pubkey-link/api/core/data-access'
import { Context, SlashCommand, SlashCommandContext } from 'necord'

@Injectable()
export class VerifyCommand {
  constructor(private readonly core: ApiCoreService) {}

  @SlashCommand({ name: 'verify', description: 'Verify Discord and Solana identities' })
  async verify(@Context() [interaction]: SlashCommandContext) {
    await interaction.reply(`Visit ${this.core.config.webUrl} to verify your Discord account and link Solana wallets.`)

    return
  }
}
