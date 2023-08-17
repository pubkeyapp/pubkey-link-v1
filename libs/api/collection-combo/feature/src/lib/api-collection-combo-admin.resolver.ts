import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { AssetAttributeInput } from '@pubkey-link/api/asset/data-access'
import { ApiAuthGraphqlGuard, CtxUser } from '@pubkey-link/api/auth/data-access'
import {
  AdminCreateCollectionComboInput,
  AdminFindCollectionCombosInput,
  AdminUpdateCollectionComboInput,
  ApiCollectionComboService,
  CollectionCombo,
} from '@pubkey-link/api/collection-combo/data-access'
import { Paging } from '@pubkey-link/api/core/data-access'
import { User } from '@pubkey-link/api/user/data-access'

@Resolver()
@UseGuards(ApiAuthGraphqlGuard)
export class ApiCollectionComboAdminResolver {
  constructor(private readonly service: ApiCollectionComboService) {}

  @Mutation(() => CollectionCombo, { nullable: true })
  adminCreateCollectionCombo(@CtxUser() user: User, @Args('input') input: AdminCreateCollectionComboInput) {
    return this.service.admin.createCollectionCombo(user.id, input)
  }

  @Mutation(() => CollectionCombo, { nullable: true })
  adminAddCollectionComboAttribute(
    @CtxUser() user: User,
    @Args('collectionComboId') collectionComboId: string,
    @Args('input') input: AssetAttributeInput,
  ) {
    return this.service.admin.addCollectionComboAttribute(user.id, collectionComboId, input)
  }

  @Mutation(() => CollectionCombo, { nullable: true })
  adminRemoveCollectionComboAttribute(
    @CtxUser() user: User,
    @Args('collectionComboId') collectionComboId: string,
    @Args('assetAttributeId') assetAttributeId: string,
  ) {
    return this.service.admin.removeCollectionComboAttribute(user.id, collectionComboId, assetAttributeId)
  }

  @Mutation(() => Boolean, { nullable: true })
  adminDeleteCollectionCombo(@CtxUser() user: User, @Args('collectionComboId') collectionComboId: string) {
    return this.service.admin.deleteCollectionCombo(user.id, collectionComboId)
  }

  @Query(() => [CollectionCombo], { nullable: true })
  adminFindCollectionCombos(@CtxUser() user: User, @Args('input') input: AdminFindCollectionCombosInput) {
    return this.service.admin.findCollectionCombos(user.id, input)
  }

  @Query(() => Paging, { nullable: true })
  adminFindCollectionCombosCount(
    @CtxUser() user: CollectionCombo,
    @Args('input') input: AdminFindCollectionCombosInput,
  ) {
    return this.service.admin.findCollectionCombosCount(user.id, input)
  }

  @Query(() => CollectionCombo, { nullable: true })
  adminGetCollectionCombo(@CtxUser() user: User, @Args('collectionComboId') collectionComboId: string) {
    return this.service.admin.getCollectionCombo(user.id, collectionComboId)
  }

  @Mutation(() => CollectionCombo, { nullable: true })
  adminUpdateCollectionCombo(
    @CtxUser() user: User,
    @Args('collectionComboId') collectionComboId: string,
    @Args('input') input: AdminUpdateCollectionComboInput,
  ) {
    return this.service.admin.updateCollectionCombo(user.id, collectionComboId, input)
  }
}
