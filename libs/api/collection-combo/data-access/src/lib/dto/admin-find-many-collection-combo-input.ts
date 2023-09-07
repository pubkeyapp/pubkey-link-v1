import { Field, InputType } from '@nestjs/graphql'
import { PagingInput } from '@pubkey-link/api/core/data-access'

import { NetworkType } from '@pubkey-link/api/network/data-access'

@InputType()
export class AdminFindManyCollectionComboInput extends PagingInput() {
  @Field(() => NetworkType, { nullable: true })
  network!: NetworkType
  @Field({ nullable: true })
  search?: string
  @Field()
  collectionId!: string
}
