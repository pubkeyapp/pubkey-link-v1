import { Parent, ResolveField, Resolver } from '@nestjs/graphql'
import { DiscordServer } from '@pubkey-link/api/discord-server/data-access'

@Resolver(() => DiscordServer)
export class ApiDiscordServerFieldResolver {
  @ResolveField(() => String, { nullable: true })
  iconUrl(@Parent() server: DiscordServer) {
    return `https://cdn.discordapp.com/icons/${server.id}/${server.icon}.png`
  }

  @ResolveField(() => String, { nullable: true })
  serverUrl(@Parent() server: DiscordServer) {
    return `https://discord.com/channels/${server.id}`
  }
}
