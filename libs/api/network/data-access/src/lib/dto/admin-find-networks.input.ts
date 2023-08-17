import { Field, InputType, Int } from '@nestjs/graphql'
import { NetworkType } from '../entity/network-type.entity'

@InputType()
export class AdminFindNetworksInput {
  @Field(() => NetworkType, { nullable: true })
  type!: NetworkType
  @Field({ nullable: true })
  search?: string
  @Field(() => Int, { nullable: true, defaultValue: 0 })
  skip?: number
  @Field(() => Int, { nullable: true, defaultValue: 10 })
  take?: number
}
