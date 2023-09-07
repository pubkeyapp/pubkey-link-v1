import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ApiAuthGraphqlGuard, CtxUser } from '@pubkey-link/api/auth/data-access'
import {
  ApiUserService,
  User,
  UserFindManyUserInput,
  UserPaging,
  UserUpdateUserInput,
} from '@pubkey-link/api/user/data-access'

@Resolver()
@UseGuards(ApiAuthGraphqlGuard)
export class ApiUserUserResolver {
  constructor(private readonly service: ApiUserService) {}

  @Query(() => UserPaging)
  userFindManyUser(@CtxUser() user: User, @Args('input') input: UserFindManyUserInput) {
    return this.service.user.findManyUser(user.id as string, input)
  }

  @Query(() => User, { nullable: true })
  userFindOneUser(@CtxUser() user: User, @Args('username') username: string) {
    return this.service.user.findOneUser(user.id as string, username)
  }

  @Mutation(() => User, { nullable: true })
  userUpdateUser(@CtxUser() user: User, @Args('input') input: UserUpdateUserInput) {
    return this.service.user.updateUser(user.id as string, input)
  }
}
