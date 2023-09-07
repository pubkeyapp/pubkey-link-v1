import { UseGuards } from '@nestjs/common'
import { Args, Query, Resolver } from '@nestjs/graphql'
import { ApiAuthGraphqlGuard, CtxUser } from '@pubkey-link/api/auth/data-access'
import {
  ApiCollectionService,
  Collection,
  CollectionPaging,
  UserFindManyCollectionInput,
} from '@pubkey-link/api/collection/data-access'
import { User } from '@pubkey-link/api/user/data-access'

@Resolver()
@UseGuards(ApiAuthGraphqlGuard)
export class ApiCollectionUserResolver {
  constructor(private readonly service: ApiCollectionService) {}

  @Query(() => CollectionPaging)
  userFindManyCollection(@CtxUser() user: User, @Args('input') input: UserFindManyCollectionInput) {
    return this.service.user.findManyCollection(user.id, input)
  }

  @Query(() => Collection, { nullable: true })
  userFindOneCollection(@CtxUser() user: User, @Args('collectionId') collectionId: string) {
    return this.service.user.findOneCollection(user.id, collectionId)
  }
}
