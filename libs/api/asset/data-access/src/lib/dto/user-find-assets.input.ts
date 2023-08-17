import { Field, InputType, Int } from '@nestjs/graphql'
import { NetworkType } from '@pubkey-link/api/network/data-access'
import { AssetAttributeInput } from '../entity/asset-attribute-input'

@InputType()
export class UserFindAssetsInput {
  @Field(() => NetworkType, { nullable: true })
  network?: NetworkType
  @Field(() => String, { nullable: true })
  collectionAccount?: string
  @Field(() => String, { nullable: true })
  ownerId?: string
  @Field({ nullable: true })
  search?: string
  @Field(() => Int, { nullable: true, defaultValue: 0 })
  skip?: number
  @Field(() => Int, { nullable: true, defaultValue: 10 })
  take?: number
  @Field(() => [AssetAttributeInput], { nullable: true })
  attributes?: AssetAttributeInput[]
}
