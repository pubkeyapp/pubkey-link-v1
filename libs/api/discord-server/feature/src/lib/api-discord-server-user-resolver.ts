import { UseGuards } from '@nestjs/common'
import { Query, Resolver } from '@nestjs/graphql'
import { ApiAuthGraphqlGuard, CtxUser } from '@pubkey-link/api/auth/data-access'
import { ApiDiscordServerService, DiscordServer } from '@pubkey-link/api/discord-server/data-access'
import { User } from '@pubkey-link/api/user/data-access'

@Resolver()
@UseGuards(ApiAuthGraphqlGuard)
export class ApiDiscordServerUserResolver {
  constructor(private readonly service: ApiDiscordServerService) {}

  @Query(() => [DiscordServer], { nullable: true })
  userGetDiscordServers(@CtxUser() user: User) {
    return this.service.user.getDiscordServers(user.id)
  }
}
