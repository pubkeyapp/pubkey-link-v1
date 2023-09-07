import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { AdminFindManyAssetInput, ApiAssetService, Asset, AssetPaging } from '@pubkey-link/api/asset/data-access'
import { ApiAuthGraphqlGuard, CtxUser } from '@pubkey-link/api/auth/data-access'
import { User } from '@pubkey-link/api/user/data-access'

@Resolver()
@UseGuards(ApiAuthGraphqlGuard)
export class ApiAssetAdminResolver {
  constructor(private readonly service: ApiAssetService) {}

  @Mutation(() => Boolean, { nullable: true })
  adminDeleteAsset(@CtxUser() user: User, @Args('assetId') assetId: string) {
    return this.service.admin.deleteAsset(user.id, assetId)
  }

  @Query(() => AssetPaging)
  adminFindManyAsset(@CtxUser() user: User, @Args('input') input: AdminFindManyAssetInput) {
    return this.service.admin.findManyAsset(user.id, input)
  }

  @Query(() => Asset, { nullable: true })
  adminFindOneAsset(@CtxUser() user: User, @Args('assetId') assetId: string) {
    return this.service.admin.findOneAsset(user.id, assetId)
  }
}
