import { Field, Int, ObjectType } from '@nestjs/graphql'
import { NetworkType } from './network-type.entity'

@ObjectType()
export class NetworkToken {
  @Field()
  id!: string
  @Field()
  createdAt!: Date
  @Field()
  updatedAt!: Date
  @Field()
  address!: string
  @Field(() => Int, { nullable: true })
  decimals!: number
  @Field()
  name!: string
  @Field(() => Int, { nullable: true })
  price?: number | null
  @Field({ nullable: true })
  priceDate?: Date | null
  @Field()
  symbol!: string
  @Field(() => NetworkType, { nullable: true })
  network!: NetworkType
}
