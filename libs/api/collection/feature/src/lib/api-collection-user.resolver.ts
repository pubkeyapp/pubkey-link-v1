import { UseGuards } from '@nestjs/common'
import { Args, Query, Resolver } from '@nestjs/graphql'
import { ApiAuthGraphqlGuard, CtxUser } from '@pubkey-link/api/auth/data-access'
import { UserFindCollectionsInput, ApiCollectionService, Collection } from '@pubkey-link/api/collection/data-access'
import { Paging } from '@pubkey-link/api/core/data-access'
import { User } from '@pubkey-link/api/user/data-access'

@Resolver()
@UseGuards(ApiAuthGraphqlGuard)
export class ApiCollectionUserResolver {
  constructor(private readonly service: ApiCollectionService) {}

  @Query(() => [Collection], { nullable: true })
  userFindCollections(@CtxUser() user: User, @Args('input') input: UserFindCollectionsInput) {
    return this.service.user.findCollections(user.id, input)
  }

  @Query(() => Paging, { nullable: true })
  userFindCollectionsCount(@CtxUser() user: Collection, @Args('input') input: UserFindCollectionsInput) {
    return this.service.user.findCollectionsCount(user.id, input)
  }

  @Query(() => Collection, { nullable: true })
  userGetCollection(@CtxUser() user: User, @Args('collectionId') collectionId: string) {
    return this.service.user.getCollection(user.id, collectionId)
  }
}
