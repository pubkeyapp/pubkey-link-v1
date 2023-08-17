import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ApiAuthGraphqlGuard, CtxUser } from '@pubkey-link/api/auth/data-access'
import {
  AdminCreateCollectionInput,
  AdminFindCollectionsInput,
  AdminUpdateCollectionInput,
  ApiCollectionService,
  Collection,
} from '@pubkey-link/api/collection/data-access'
import { Paging } from '@pubkey-link/api/core/data-access'
import { User } from '@pubkey-link/api/user/data-access'

@Resolver()
@UseGuards(ApiAuthGraphqlGuard)
export class ApiCollectionAdminResolver {
  constructor(private readonly service: ApiCollectionService) {}

  @Mutation(() => Collection, { nullable: true })
  adminCreateCollection(@CtxUser() user: User, @Args('input') input: AdminCreateCollectionInput) {
    return this.service.admin.createCollection(user.id, input)
  }
  @Mutation(() => Boolean, { nullable: true })
  adminDeleteCollection(@CtxUser() user: User, @Args('collectionId') collectionId: string) {
    return this.service.admin.deleteCollection(user.id, collectionId)
  }

  @Query(() => [Collection], { nullable: true })
  adminFindCollections(@CtxUser() user: User, @Args('input') input: AdminFindCollectionsInput) {
    return this.service.admin.findCollections(user.id, input)
  }

  @Query(() => Paging, { nullable: true })
  adminFindCollectionsCount(@CtxUser() user: Collection, @Args('input') input: AdminFindCollectionsInput) {
    return this.service.admin.findCollectionsCount(user.id, input)
  }

  @Query(() => Collection, { nullable: true })
  adminGetCollection(@CtxUser() user: User, @Args('collectionId') collectionId: string) {
    return this.service.admin.getCollection(user.id, collectionId)
  }

  @Mutation(() => Boolean, { nullable: true })
  adminSyncCollection(@CtxUser() user: User, @Args('collectionId') collectionId: string) {
    return this.service.syncCollection(user.id, collectionId)
  }

  @Mutation(() => Boolean, { nullable: true })
  adminSyncCollections(@CtxUser() user: User) {
    return this.service.syncCollections(user.id)
  }

  @Mutation(() => Collection, { nullable: true })
  adminUpdateCollection(
    @CtxUser() user: User,
    @Args('collectionId') collectionId: string,
    @Args('input') input: AdminUpdateCollectionInput,
  ) {
    return this.service.admin.updateCollection(user.id, collectionId, input)
  }
}
