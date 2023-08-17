import { Field, InputType } from '@nestjs/graphql'

import { NetworkType } from '@pubkey-link/api/network/data-access'

@InputType()
export class AdminCreateCollectionInput {
  @Field()
  account!: string
  @Field({ nullable: true })
  name?: string
  @Field(() => NetworkType, { nullable: true })
  network!: NetworkType
}
