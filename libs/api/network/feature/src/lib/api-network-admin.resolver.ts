import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ApiAuthGraphqlGuard, CtxUser } from '@pubkey-link/api/auth/data-access'
import {
  AdminCreateNetworkInput,
  AdminCreateNetworkTokenInput,
  AdminFindManyNetworkInput,
  AdminUpdateNetworkInput,
  ApiNetworkService,
  Network,
  NetworkPaging,
  NetworkToken,
} from '@pubkey-link/api/network/data-access'
import { User } from '@pubkey-link/api/user/data-access'
import { GraphQLJSON } from 'graphql-scalars'

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

  @Query(() => NetworkPaging)
  adminFindManyNetwork(@CtxUser() user: User, @Args('input') input: AdminFindManyNetworkInput) {
    return this.service.admin.findManyNetwork(user.id, input)
  }

  @Query(() => Network, { nullable: true })
  adminFindOneNetwork(@CtxUser() user: User, @Args('networkId') networkId: string) {
    return this.service.admin.findOneNetwork(user.id, networkId)
  }
  @Query(() => GraphQLJSON, { nullable: true })
  adminSearchNetworkAsset(@CtxUser() user: User, @Args('networkId') networkId: string, @Args('mint') mint: string) {
    return this.service.searchNetworkAsset(user.id, networkId, mint)
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
