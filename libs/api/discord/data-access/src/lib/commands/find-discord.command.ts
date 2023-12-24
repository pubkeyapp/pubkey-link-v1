import { Injectable } from '@nestjs/common'
import { Asset, Collection, IdentityProvider } from '@prisma/client'
import { ApiCoreService } from '@pubkey-link/api/core/data-access'
import { User } from 'discord.js'
import { Context, Options, SlashCommand, SlashCommandContext, UserOption } from 'necord'

export class FindDiscordIdentityDto {
  @UserOption({
    name: 'user',
    description: 'User to find',
    required: true,
  })
  user!: User
}

@Injectable()
export class FindDiscordIdentityCommand {
  constructor(private readonly core: ApiCoreService) {}

  @SlashCommand({ name: 'find-discord', description: 'Find Discord identity on PubKey' })
  async collections(@Context() [interaction]: SlashCommandContext, @Options() { user }: FindDiscordIdentityDto) {
    const provider = IdentityProvider.Discord
    user = user ?? interaction.user

    const found = await this.core.getUserByProviderId(IdentityProvider.Discord, user.id)

    if (!found) {
      return interaction.reply({
        content: `No ${provider} identity found for <@${user.id}>, they can sign up at ${this.core.config.webUrl}`,
      })
    }

    return interaction.reply(
      getPreparedMessages({
        accounts: getSolanaAccounts({ identities: found.identities }),
      }),
    )
  }
}

export function getSolanaAccounts({
  identities,
}: {
  identities: { provider: IdentityProvider; providerId: string; assets: (Asset & { collection: Collection })[] }[]
}) {
  return identities.map((i) => {
    return {
      provider: IdentityProvider.Solana,
      providerId: i.providerId,
      assetCount: i.assets.length,
      explorerUrl: getExplorerUrl(i.providerId),
      collections: i.assets.reduce((acc, a) => {
        if (!acc.find((item) => item === a.collection.name)) {
          acc.push(a.collection.name as string)
        }
        return acc
      }, [] as string[]),
    }
  })
}

export function getPreparedMessages({
  accounts,
}: {
  accounts: {
    provider: IdentityProvider
    providerId: string
    assetCount: number
    explorerUrl: string
    collections: string[]
  }[]
}) {
  const discordIdentity = accounts.find((a) => a.provider === IdentityProvider.Discord)
  const solanaIdentities = accounts.filter((a) => a.provider === IdentityProvider.Solana)
  const totalAssets = solanaIdentities.reduce((acc, a) => acc + a.assetCount, 0)
  const totalCollections = solanaIdentities.reduce((acc, a) => acc + a.collections.length, 0)

  return {
    embeds: [
      {
        title: 'Account Summary',
        description: `I found ${discordIdentity ? 'a' : 'no'} Discord account and ${
          solanaIdentities.length
        } Solana accounts`,
        thumbnail: {
          url: `https://cdn.discordapp.com/attachments/${discordIdentity?.providerId}/avatars/${discordIdentity?.providerId}.png`,
        },
        fields: [
          {
            name: 'Discord',
            value: discordIdentity
              ? ` <@${discordIdentity.providerId}> has ${totalAssets} assets from ${totalCollections} collections in ${solanaIdentities.length} accounts.`
              : 'No Discord identity found',
          },
          ...solanaIdentities.map((a) => {
            return {
              name: ellipsify(a.providerId),
              value: `${a.assetCount} assets in ${a.collections.length} collections:${a.collections
                .map((collection) => `\n\` ==> ${collection} \``)
                .join('')}\n[View on Solana Explorer](${a.explorerUrl})`,
            }
          }),
        ],
      },
    ],
  }
}

export function getExplorerUrl(account: string) {
  return `https://explorer.solana.com/account/${account}`
}

export function ellipsify(str = '', len = 4) {
  if (str.length > 30) {
    return str.substring(0, len) + '..' + str.substring(str.length - len, str.length)
  }
  return str
}
