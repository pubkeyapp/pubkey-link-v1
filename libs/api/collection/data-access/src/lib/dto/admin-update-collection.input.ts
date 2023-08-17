import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class AdminUpdateCollectionInput {
  @Field()
  account?: string
  @Field()
  name?: string
}
