import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class AdminUpdateCollectionInput {
  @Field({ nullable: true })
  account?: string
  @Field({ nullable: true })
  name?: string
  @Field({ nullable: true })
  vaultId?: string | null
}
