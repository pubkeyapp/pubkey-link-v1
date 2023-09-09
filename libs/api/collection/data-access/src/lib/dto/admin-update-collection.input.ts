import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class AdminUpdateCollectionInput {
  @Field({ nullable: true })
  account?: string
  @Field({ nullable: true })
  name?: string
  @Field()
  imageUrl?: string | null
  @Field()
  metadataUrl?: string | null
  @Field()
  description?: string | null
  @Field()
  symbol?: string | null
  @Field({ nullable: true })
  vaultId?: string | null
}
