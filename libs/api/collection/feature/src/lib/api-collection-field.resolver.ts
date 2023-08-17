import { Parent, ResolveField, Resolver } from '@nestjs/graphql'
import { AssetAttribute } from '@pubkey-link/api/asset/data-access'
import { CollectionCombo } from '@pubkey-link/api/collection-combo/data-access'
import { Collection } from '@pubkey-link/api/collection/data-access'

@Resolver(() => Collection)
export class ApiCollectionFieldResolver {
  @ResolveField(() => [AssetAttribute], { nullable: true })
  attributes(@Parent() collection: Collection) {
    return collection.attributes ?? []
  }

  @ResolveField(() => [CollectionCombo], { nullable: true })
  combos(@Parent() collection: Collection) {
    return collection.combos ?? []
  }
}
