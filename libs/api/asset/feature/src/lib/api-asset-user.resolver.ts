import { UseGuards } from '@nestjs/common'
import { Args, Query, Resolver } from '@nestjs/graphql'
import { ApiAssetService, Asset, UserFindAssetsInput } from '@pubkey-link/api/asset/data-access'
import { ApiAuthGraphqlGuard, CtxUser } from '@pubkey-link/api/auth/data-access'
import { Paging } from '@pubkey-link/api/core/data-access'
import { User } from '@pubkey-link/api/user/data-access'

@Resolver()
@UseGuards(ApiAuthGraphqlGuard)
export class ApiAssetUserResolver {
  constructor(private readonly service: ApiAssetService) {}

  @Query(() => [Asset], { nullable: true })
  userFindAssets(@CtxUser() user: User, @Args('input') input: UserFindAssetsInput) {
    return this.service.user.findAssets(user.id, input)
  }

  @Query(() => Paging, { nullable: true })
  userFindAssetsCount(@CtxUser() user: Asset, @Args('input') input: UserFindAssetsInput) {
    return this.service.user.findAssetsCount(user.id, input)
  }

  @Query(() => Asset, { nullable: true })
  userGetAsset(@CtxUser() user: User, @Args('assetId') assetId: string) {
    return this.service.user.getAsset(user.id, assetId)
  }
}
