import { Field, InputType } from '@nestjs/graphql'
import { PagingInput } from '@pubkey-link/api/core/data-access'

import { NetworkType } from '@pubkey-link/api/network/data-access'

@InputType()
export class AdminFindManyAssetInput extends PagingInput() {
  @Field(() => NetworkType, { nullable: true })
  network?: NetworkType
  @Field(() => String, { nullable: true })
  collectionAccount?: string
  @Field({ nullable: true })
  search?: string
}
