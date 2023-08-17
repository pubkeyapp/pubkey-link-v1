import { UseGuards } from '@nestjs/common'
import { Args, Query, Resolver } from '@nestjs/graphql'
import { ApiAuthGraphqlGuard, CtxUser } from '@pubkey-link/api/auth/data-access'
import { ApiDevService } from '@pubkey-link/api/dev/data-access'
import { IdentityProvider } from '@pubkey-link/api/identity/data-access'
import { NetworkType } from '@pubkey-link/api/network/data-access'
import { User } from '@pubkey-link/api/user/data-access'
import { GraphQLJSON } from 'graphql-scalars'

@Resolver()
@UseGuards(ApiAuthGraphqlGuard)
export class ApiDevAdminResolver {
  constructor(private readonly service: ApiDevService) {}

  @Query(() => GraphQLJSON, { nullable: true })
  adminDevCheckAccount(
    @CtxUser() user: User,
    @Args('type', { type: () => NetworkType }) type: NetworkType,
    @Args('address') address: string,
  ) {
    return this.service.checkAccount(user.id, type, address)
  }

  @Query(() => GraphQLJSON, { nullable: true })
  adminDevCheckIdentity(
    @CtxUser() user: User,
    @Args('provider', { type: () => IdentityProvider }) provider: IdentityProvider,
    @Args('providerId') providerId: string,
  ) {
    return this.service.checkIdentity(user.id, provider, providerId)
  }
}
