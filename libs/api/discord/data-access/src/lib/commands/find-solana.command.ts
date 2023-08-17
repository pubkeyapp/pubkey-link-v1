import { Injectable } from '@nestjs/common'
import { IdentityProvider } from '@prisma/client'
import { ApiCoreService } from '@pubkey-link/api/core/data-access'
import { PublicKey } from '@solana/web3.js'
import { Context, Options, SlashCommand, SlashCommandContext, StringOption } from 'necord'
import { getPreparedMessages, getSolanaAccounts } from './find-discord.command'

export class FindSolanaIdentityDto {
  @StringOption({
    name: 'address',
    description: 'Solana address to find',
    required: true,
    min_length: 32,
    max_length: 44,
  })
  address!: string
}

@Injectable()
export class FindSolanaIdentityCommand {
  constructor(private readonly core: ApiCoreService) {}
  @SlashCommand({ name: 'find-solana', description: 'Find Solana identity on PubKey' })
  async collections(@Context() [interaction]: SlashCommandContext, @Options() { address }: FindSolanaIdentityDto) {
    const provider = IdentityProvider.Solana
    const validAddress = ensureValidSolanaProviderId(address)

    if (!validAddress) {
      return interaction.reply({ content: `Invalid Solana address: ${address}` })
    }

    const found = await this.core.getUserByProviderId(provider, address)

    if (!found) {
      return interaction.reply({
        content: `No ${provider} identity found for ${address}.`,
      })
    }

    return interaction.reply(getPreparedMessages({ accounts: getSolanaAccounts({ identities: found.identities }) }))
  }
}

export function ensureValidSolanaProviderId(address: string) {
  try {
    new PublicKey(address)
    return true
  } catch (_) {
    return false
  }
}
