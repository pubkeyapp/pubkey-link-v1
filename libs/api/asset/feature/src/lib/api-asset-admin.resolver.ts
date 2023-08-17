import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ApiAuthGraphqlGuard, CtxUser } from '@pubkey-link/api/auth/data-access'
import { Paging } from '@pubkey-link/api/core/data-access'
import { AdminFindAssetsInput, ApiAssetService, Asset } from '@pubkey-link/api/asset/data-access'
import { User } from '@pubkey-link/api/user/data-access'

@Resolver()
@UseGuards(ApiAuthGraphqlGuard)
export class ApiAssetAdminResolver {
  constructor(private readonly service: ApiAssetService) {}

  @Mutation(() => Boolean, { nullable: true })
  adminDeleteAsset(@CtxUser() user: User, @Args('assetId') assetId: string) {
    return this.service.admin.deleteAsset(user.id, assetId)
  }

  @Query(() => [Asset], { nullable: true })
  adminFindAssets(@CtxUser() user: User, @Args('input') input: AdminFindAssetsInput) {
    return this.service.admin.findAssets(user.id, input)
  }

  @Query(() => Paging, { nullable: true })
  adminFindAssetsCount(@CtxUser() user: Asset, @Args('input') input: AdminFindAssetsInput) {
    return this.service.admin.findAssetsCount(user.id, input)
  }

  @Query(() => Asset, { nullable: true })
  adminGetAsset(@CtxUser() user: User, @Args('assetId') assetId: string) {
    return this.service.admin.getAsset(user.id, assetId)
  }
}
