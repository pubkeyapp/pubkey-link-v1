import { Parent, ResolveField, Resolver } from '@nestjs/graphql'
import { Asset } from '@pubkey-link/api/asset/data-access'
import { Collection } from '@pubkey-link/api/collection/data-access'
import { Identity } from '@pubkey-link/api/identity/data-access'

@Resolver(() => Asset)
export class ApiAssetFieldResolver {
  @ResolveField(() => Collection, { nullable: true })
  collection(@Parent() asset: Asset) {
    return asset.collection
  }

  @ResolveField(() => Identity, { nullable: true })
  identity(@Parent() asset: Asset) {
    return asset.identity
  }
}
