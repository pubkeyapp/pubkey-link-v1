import { UseGuards } from '@nestjs/common'
import { Parent, ResolveField, Resolver } from '@nestjs/graphql'
import { AssetAttribute } from '@pubkey-link/api/asset/data-access'
import { ApiAuthGraphqlGuard } from '@pubkey-link/api/auth/data-access'
import { CollectionCombo } from '@pubkey-link/api/collection-combo/data-access'

@Resolver(() => CollectionCombo)
@UseGuards(ApiAuthGraphqlGuard)
export class ApiCollectionComboFieldResolver {
  @ResolveField(() => [AssetAttribute], { nullable: true })
  attributes(@Parent() parent: CollectionCombo) {
    return parent.attributes
  }
}
