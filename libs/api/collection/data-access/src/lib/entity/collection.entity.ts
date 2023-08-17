import { Field, Int, ObjectType } from '@nestjs/graphql'
import { NetworkType } from '@pubkey-link/api/network/data-access'

@ObjectType()
export class Collection {
  @Field()
  id!: string
  @Field()
  createdAt!: Date
  @Field()
  updatedAt!: Date
  @Field()
  name!: string
  @Field({ nullable: true })
  account!: string
  @Field(() => Int, { nullable: true })
  assetCount!: number
  @Field(() => NetworkType, { nullable: true })
  network!: NetworkType
  attributes?: unknown[]
  combos?: unknown[]
}
