import { Field, InputType } from '@nestjs/graphql'
import { NetworkType } from '../entity/network-type.entity'

@InputType()
export class AdminCreateNetworkInput {
  @Field()
  endpoint!: string
  @Field()
  name!: string
  @Field(() => NetworkType, { nullable: true })
  type!: NetworkType
}
