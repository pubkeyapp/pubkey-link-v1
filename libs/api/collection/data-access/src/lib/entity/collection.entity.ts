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
  @Field({ nullable: true })
  account!: string
  @Field(() => Int, { nullable: true })
  assetCount!: number
  @Field()
  name?: string | null
  @Field({ nullable: true })
  imageUrl?: string | null
  @Field({ nullable: true })
  metadataUrl?: string | null
  @Field({ nullable: true })
  description?: string | null
  @Field({ nullable: true })
  enableSync!: boolean | null
  @Field({ nullable: true })
  symbol?: string | null
  @Field({ nullable: true })
  vaultId?: string | null
  @Field(() => NetworkType, { nullable: true })
  network!: NetworkType
  attributes?: unknown[]
  combos?: unknown[]
}
