import { Field, InputType, Int } from '@nestjs/graphql'

import { NetworkType } from '@pubkey-link/api/network/data-access'

@InputType()
export class AdminFindCollectionCombosInput {
  @Field(() => NetworkType, { nullable: true })
  network!: NetworkType
  @Field({ nullable: true })
  search?: string
  @Field()
  collectionId!: string
  @Field(() => Int, { nullable: true, defaultValue: 0 })
  skip?: number
  @Field(() => Int, { nullable: true, defaultValue: 10 })
  take?: number
}
