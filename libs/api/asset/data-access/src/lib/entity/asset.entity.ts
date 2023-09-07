import { Field, HideField, ObjectType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { NetworkType } from '@pubkey-link/api/network/data-access'
import { GraphQLJSON } from 'graphql-scalars'
import { AssetAttribute } from './asset-attribute.entity'

@ObjectType()
export class Asset {
  @Field()
  id!: string
  @Field()
  createdAt!: Date
  @Field()
  updatedAt!: Date
  @Field({ nullable: true })
  account!: string
  @Field(() => [AssetAttribute], { nullable: true })
  attributes?: Prisma.JsonValue | null
  @Field(() => GraphQLJSON, { nullable: true })
  attributeMap?: unknown | null
  @Field()
  name!: string
  @Field(() => NetworkType, { nullable: true })
  network!: NetworkType
  @Field({ nullable: true })
  image?: string | null
  @Field(() => GraphQLJSON, { nullable: true })
  metadata?: unknown
  @Field({ nullable: true })
  owner?: string
  @Field(() => GraphQLJSON, { nullable: true })
  raw?: unknown
  @Field({ nullable: true })
  symbol?: string | null
  @HideField()
  collection?: unknown
  @HideField()
  identity?: unknown
}
