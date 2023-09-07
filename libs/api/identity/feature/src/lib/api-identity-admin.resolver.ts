import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ApiAuthGraphqlGuard, CtxUser } from '@pubkey-link/api/auth/data-access'
import {
  AdminCreateIdentityInput,
  AdminFindManyIdentityInput,
  ApiIdentityService,
  Identity,
} from '@pubkey-link/api/identity/data-access'
import { User } from '@pubkey-link/api/user/data-access'

@Resolver()
@UseGuards(ApiAuthGraphqlGuard)
export class ApiIdentityAdminResolver {
  constructor(private readonly service: ApiIdentityService) {}

  @Mutation(() => Identity, { nullable: true })
  adminCreateIdentity(@CtxUser() user: User, @Args('input') input: AdminCreateIdentityInput) {
    return this.service.admin.createIdentity(user.id, input)
  }
  @Mutation(() => Boolean, { nullable: true })
  adminDeleteIdentity(@CtxUser() user: User, @Args('identityId') identityId: string) {
    return this.service.admin.deleteIdentity(user.id, identityId)
  }
  @Query(() => [Identity], { nullable: true })
  adminFindManyIdentity(@CtxUser() user: User, @Args('input') input: AdminFindManyIdentityInput) {
    return this.service.admin.findManyIdentity(user.id, input)
  }
}
