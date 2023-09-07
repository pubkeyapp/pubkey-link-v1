import { Field, InputType } from '@nestjs/graphql'
import { PagingInput } from '@pubkey-link/api/core/data-access'
import { NetworkType } from '@pubkey-link/api/network/data-access'
import { AssetAttributeInput } from '../entity/asset-attribute-input'

@InputType()
export class UserFindManyAssetInput extends PagingInput() {
  @Field(() => NetworkType, { nullable: true })
  network?: NetworkType
  @Field(() => String, { nullable: true })
  collectionAccount?: string
  @Field(() => String, { nullable: true })
  ownerId?: string
  @Field({ nullable: true })
  search?: string
  @Field(() => [AssetAttributeInput], { nullable: true })
  attributes?: AssetAttributeInput[]
}
