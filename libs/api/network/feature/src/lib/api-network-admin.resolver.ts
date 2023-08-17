import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ApiAuthGraphqlGuard, CtxUser } from '@pubkey-link/api/auth/data-access'
import { Paging } from '@pubkey-link/api/core/data-access'
import {
  AdminCreateNetworkInput,
  AdminCreateNetworkTokenInput,
  AdminFindNetworksInput,
  AdminUpdateNetworkInput,
  ApiNetworkService,
  Network,
  NetworkToken,
} from '@pubkey-link/api/network/data-access'
import { User } from '@pubkey-link/api/user/data-access'

@Resolver()
@UseGuards(ApiAuthGraphqlGuard)
export class ApiNetworkAdminResolver {
  constructor(private readonly service: ApiNetworkService) {}

  @Mutation(() => Network, { nullable: true })
  adminCreateNetwork(@CtxUser() user: User, @Args('input') input: AdminCreateNetworkInput) {
    return this.service.admin.createNetwork(user.id, input)
  }

  @Mutation(() => NetworkToken, { nullable: true })
  adminCreateNetworkToken(@CtxUser() user: User, @Args('input') input: AdminCreateNetworkTokenInput) {
    return this.service.admin.createNetworkToken(user.id, input)
  }
  @Mutation(() => Boolean, { nullable: true })
  adminDeleteNetwork(@CtxUser() user: User, @Args('networkId') networkId: string) {
    return this.service.admin.deleteNetwork(user.id, networkId)
  }
  @Mutation(() => Boolean, { nullable: true })
  adminDeleteNetworkToken(@CtxUser() user: User, @Args('networkTokenId') networkTokenId: string) {
    return this.service.admin.deleteNetworkToken(user.id, networkTokenId)
  }

  @Query(() => [Network], { nullable: true })
  adminFindNetworks(@CtxUser() user: User, @Args('input') input: AdminFindNetworksInput) {
    return this.service.admin.findNetworks(user.id, input)
  }

  @Query(() => Paging, { nullable: true })
  adminFindNetworksCount(@CtxUser() user: Network, @Args('input') input: AdminFindNetworksInput) {
    return this.service.admin.findNetworksCount(user.id, input)
  }

  @Query(() => Network, { nullable: true })
  adminGetNetwork(@CtxUser() user: User, @Args('networkId') networkId: string) {
    return this.service.admin.getNetwork(user.id, networkId)
  }

  @Mutation(() => Network, { nullable: true })
  adminUpdateNetwork(
    @CtxUser() user: User,
    @Args('networkId') networkId: string,
    @Args('input') input: AdminUpdateNetworkInput,
  ) {
    return this.service.admin.updateNetwork(user.id, networkId, input)
  }
}
