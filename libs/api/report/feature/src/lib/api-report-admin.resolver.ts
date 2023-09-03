import { UseGuards } from '@nestjs/common'
import { Args, Query, Resolver } from '@nestjs/graphql'
import { ApiAuthGraphqlGuard, CtxUser } from '@pubkey-link/api/auth/data-access'
import { AdminReportDiscordMemberWalletsInput, ApiReportService } from '@pubkey-link/api/report/data-access'
import { User } from '@pubkey-link/api/user/data-access'
import { GraphQLJSON } from 'graphql-scalars'

@Resolver()
@UseGuards(ApiAuthGraphqlGuard)
export class ApiReportAdminResolver {
  constructor(private readonly service: ApiReportService) {}

  @Query(() => GraphQLJSON, { nullable: true })
  adminReportDiscordMemberWallets(@CtxUser() user: User, @Args('input') input: AdminReportDiscordMemberWalletsInput) {
    return this.service.admin.reportDiscordMemberWallets(user.id, input)
  }
}
