import { Field, HideField, ObjectType } from '@nestjs/graphql'
import { NetworkToken } from './network-token'
import { NetworkType } from './network-type.entity'

@ObjectType()
export class Network {
  @Field()
  id!: string
  @Field()
  createdAt!: Date
  @Field()
  updatedAt!: Date
  @Field()
  name!: string
  @Field({ nullable: true })
  endpoint!: string
  @Field(() => NetworkType, { nullable: true })
  type!: NetworkType
  @Field(() => [NetworkToken], { nullable: true })
  tokens?: NetworkToken[] | null
  @HideField()
  collections?: unknown[]
}
