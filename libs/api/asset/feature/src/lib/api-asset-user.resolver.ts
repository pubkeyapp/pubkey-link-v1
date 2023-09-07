import { UseGuards } from '@nestjs/common'
import { Args, Query, Resolver } from '@nestjs/graphql'
import { ApiAssetService, Asset, AssetPaging, UserFindManyAssetInput } from '@pubkey-link/api/asset/data-access'
import { ApiAuthGraphqlGuard, CtxUser } from '@pubkey-link/api/auth/data-access'
import { User } from '@pubkey-link/api/user/data-access'

@Resolver()
@UseGuards(ApiAuthGraphqlGuard)
export class ApiAssetUserResolver {
  constructor(private readonly service: ApiAssetService) {}

  @Query(() => AssetPaging)
  userFindManyAsset(@CtxUser() user: User, @Args('input') input: UserFindManyAssetInput) {
    return this.service.user.findManyAsset(user.id, input)
  }

  @Query(() => Asset, { nullable: true })
  userFindOneAsset(@CtxUser() user: User, @Args('assetId') assetId: string) {
    return this.service.user.findOneAsset(user.id, assetId)
  }
}
