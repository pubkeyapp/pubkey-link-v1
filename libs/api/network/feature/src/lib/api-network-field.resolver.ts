import { Parent, ResolveField, Resolver } from '@nestjs/graphql'
import { Collection } from '@pubkey-link/api/collection/data-access'
import { Network } from '@pubkey-link/api/network/data-access'

@Resolver(() => Network)
export class ApiNetworkFieldResolver {
  @ResolveField(() => [Collection], { nullable: true })
  collections(@Parent() network: Network) {
    return network.collections ?? []
  }
}
