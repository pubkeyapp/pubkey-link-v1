import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ApiAuthGraphqlGuard, CtxUser } from '@pubkey-link/api/auth/data-access'
import {
  AdminCreateDiscordRoleInput,
  AdminDeleteDiscordRoleInput,
  AdminFindManyDiscordServerInput,
  AdminUpdateDiscordServerInput,
  ApiDiscordServerService,
  DiscordServer,
  DiscordServerPaging,
} from '@pubkey-link/api/discord-server/data-access'
import { User } from '@pubkey-link/api/user/data-access'

@Resolver()
@UseGuards(ApiAuthGraphqlGuard)
export class ApiDiscordServerAdminResolver {
  constructor(private readonly service: ApiDiscordServerService) {}

  @Query(() => DiscordServerPaging)
  adminFindManyDiscordServer(@CtxUser() user: User, @Args('input') input: AdminFindManyDiscordServerInput) {
    return this.service.admin.findManyDiscordServer(user.id, input)
  }

  @Query(() => DiscordServer, { nullable: true })
  adminFindOneDiscordServer(@CtxUser() user: User, @Args('serverId') serverId: string) {
    return this.service.admin.findOneDiscordServer(user.id, serverId)
  }

  @Mutation(() => DiscordServer, { nullable: true })
  adminUpdateDiscordServer(
    @CtxUser() user: User,
    @Args('serverId') serverId: string,
    @Args('input') input: AdminUpdateDiscordServerInput,
  ) {
    return this.service.admin.updateDiscordServer(user.id, serverId, input)
  }

  @Mutation(() => Boolean, { nullable: true })
  adminSyncDiscordRoles(@CtxUser() user: User, @Args('serverId') serverId: string) {
    return this.service.admin.syncDiscordRoles(user.id, serverId)
  }

  @Mutation(() => Boolean, { nullable: true })
  adminCreateDiscordRole(@CtxUser() user: User, @Args('input') input: AdminCreateDiscordRoleInput) {
    return this.service.admin.createDiscordRole(user.id, input)
  }

  @Mutation(() => Boolean, { nullable: true })
  adminCreateDiscordRoleCondition(@CtxUser() user: User, @Args('roleId') roleId: string) {
    return this.service.admin.createDiscordRoleCondition(user.id, roleId)
  }

  @Mutation(() => Boolean, { nullable: true })
  adminDeleteDiscordRole(@CtxUser() user: User, @Args('input') input: AdminDeleteDiscordRoleInput) {
    return this.service.admin.deleteDiscordRole(user.id, input)
  }

  @Mutation(() => Boolean, { nullable: true })
  adminDeleteDiscordServer(@CtxUser() user: User, @Args('serverId') serverId: string) {
    return this.service.admin.deleteDiscordServer(user.id, serverId)
  }

  @Mutation(() => Boolean, { nullable: true })
  adminDeleteDiscordRoleCondition(@CtxUser() user: User, @Args('conditionId') conditionId: string) {
    return this.service.admin.deleteDiscordRoleCondition(user.id, conditionId)
  }

  @Mutation(() => Boolean, { nullable: true })
  adminAddDiscordRoleConditionCollection(
    @CtxUser() user: User,
    @Args('conditionId') conditionId: string,
    @Args('collectionId') collectionId: string,
  ) {
    return this.service.admin.addDiscordRoleConditionCollection(user.id, conditionId, collectionId)
  }

  @Mutation(() => Boolean, { nullable: true })
  adminRemoveDiscordRoleConditionCollection(
    @CtxUser() user: User,
    @Args('conditionId') conditionId: string,
    @Args('collectionId') collectionId: string,
  ) {
    return this.service.admin.removeDiscordRoleConditionCollection(user.id, conditionId, collectionId)
  }

  @Mutation(() => Boolean, { nullable: true })
  adminAddDiscordRoleConditionCombo(
    @CtxUser() user: User,
    @Args('conditionId') conditionId: string,
    @Args('comboId') comboId: string,
  ) {
    return this.service.admin.addDiscordRoleConditionCombo(user.id, conditionId, comboId)
  }

  @Mutation(() => Boolean, { nullable: true })
  adminRemoveDiscordRoleConditionCombo(
    @CtxUser() user: User,
    @Args('conditionId') conditionId: string,
    @Args('comboId') comboId: string,
  ) {
    return this.service.admin.removeDiscordRoleConditionCombo(user.id, conditionId, comboId)
  }
}
