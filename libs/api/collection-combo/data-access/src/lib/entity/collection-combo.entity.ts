import { Field, ObjectType } from '@nestjs/graphql'
import { NetworkType } from '@pubkey-link/api/network/data-access'

@ObjectType()
export class CollectionCombo {
  @Field()
  id!: string
  @Field()
  createdAt!: Date
  @Field()
  updatedAt!: Date
  @Field()
  name!: string
  @Field({ nullable: true })
  collectionAccount!: string
  @Field({ nullable: true })
  description!: string
  @Field(() => NetworkType, { nullable: true })
  network!: NetworkType
  attributes?: unknown[]
}
