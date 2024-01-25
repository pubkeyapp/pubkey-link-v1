import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ApiAuthGraphqlGuard, CtxUser } from '@pubkey-link/api/auth/data-access'
import { ApiBackupService } from '@pubkey-link/api/backup/data-access'
import { User } from '@pubkey-link/api/user/data-access'
import { GraphQLJSON } from 'graphql-scalars'

@Resolver()
@UseGuards(ApiAuthGraphqlGuard)
export class ApiAdminBackupResolver {
  constructor(private readonly service: ApiBackupService) {}

  @Mutation(() => Boolean)
  adminCreateBackup(@CtxUser() user: User) {
    return this.service.createBackup(user.id)
  }

  @Mutation(() => Boolean)
  adminDeleteBackup(@CtxUser() user: User, @Args('name') name: string) {
    return this.service.deleteBackup(user.id, name)
  }

  @Mutation(() => Boolean)
  adminFetchBackup(@CtxUser() user: User, @Args('url') url: string) {
    return this.service.fetchBackup(user.id, url)
  }

  @Query(() => GraphQLJSON, { nullable: true })
  adminGetBackup(@CtxUser() user: User, @Args('name') name: string) {
    return this.service.adminGetBackup(user.id, name)
  }
  @Query(() => [String])
  adminGetBackups(@CtxUser() user: User) {
    return this.service.adminGetBackups(user.id)
  }

  @Mutation(() => Boolean)
  adminRestoreBackup(@CtxUser() user: User, @Args('name') name: string) {
    return this.service.restoreBackup(user.id, name)
  }
}
