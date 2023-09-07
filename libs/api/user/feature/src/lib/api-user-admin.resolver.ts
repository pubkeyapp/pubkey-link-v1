import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ApiAuthGraphqlGuard, CtxUser } from '@pubkey-link/api/auth/data-access'
import {
  AdminCreateUserInput,
  AdminFindManyUserInput,
  AdminUpdateUserInput,
  ApiUserService,
  User,
  UserPaging,
} from '@pubkey-link/api/user/data-access'

@Resolver()
@UseGuards(ApiAuthGraphqlGuard)
export class ApiUserAdminResolver {
  constructor(private readonly service: ApiUserService) {}

  @Mutation(() => User, { nullable: true })
  adminCreateUser(@CtxUser() user: User, @Args('input') input: AdminCreateUserInput) {
    return this.service.admin.createUser(user.id, input)
  }

  @Mutation(() => Boolean, { nullable: true })
  adminDeleteUser(@CtxUser() user: User, @Args('userId') userId: string) {
    return this.service.admin.deleteUser(user.id, userId)
  }

  @Query(() => UserPaging)
  adminFindManyUser(@CtxUser() user: User, @Args('input') input: AdminFindManyUserInput) {
    return this.service.admin.findManyUser(user.id, input)
  }

  @Query(() => User, { nullable: true })
  adminFindOneUser(@CtxUser() user: User, @Args('userId') userId: string) {
    return this.service.admin.findOneUser(user.id, userId)
  }

  @Mutation(() => User, { nullable: true })
  adminUpdateUser(@CtxUser() user: User, @Args('userId') userId: string, @Args('input') input: AdminUpdateUserInput) {
    return this.service.admin.updateUser(user.id, userId, input)
  }
}
