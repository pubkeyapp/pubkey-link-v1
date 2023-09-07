import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ApiAuthGraphqlGuard, CtxUser } from '@pubkey-link/api/auth/data-access'
import { DiscordServerChannel } from '@pubkey-link/api/discord-server/data-access'
import { ApiDiscordService } from '@pubkey-link/api/discord/data-access'
import { User } from '@pubkey-link/api/user/data-access'

@Resolver()
@UseGuards(ApiAuthGraphqlGuard)
export class ApiDiscordAdminResolver {
  constructor(private readonly service: ApiDiscordService) {}

  @Query(() => [DiscordServerChannel], { nullable: true })
  adminFindManyDiscordServerChannel(@CtxUser() user: User, @Args('serverId') serverId: string) {
    return this.service.admin.findManyDiscordServerChannel(user.id, serverId)
  }

  @Query(() => String, { nullable: true })
  adminGetBotInviteUrl(@CtxUser() user: User) {
    return this.service.bot.getInviteUrl(user.id)
  }

  @Mutation(() => Boolean, { nullable: true })
  adminTestDiscordServerBotChannel(@CtxUser() user: User, @Args('serverId') serverId: string) {
    return this.service.admin.testDiscordServerBotChannel(user.id, serverId)
  }
}
