import { Field, InputType, Int } from '@nestjs/graphql'
import { NetworkType } from '../entity/network-type.entity'

@InputType()
export class AdminCreateNetworkTokenInput {
  @Field()
  address!: string
  @Field(() => Int, { nullable: true })
  decimals!: number
  @Field()
  symbol!: string
  @Field(() => NetworkType, { nullable: true })
  network!: NetworkType
}
