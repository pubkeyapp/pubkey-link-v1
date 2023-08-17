import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class AdminCreateCollectionComboInput {
  @Field()
  collectionId!: string
  @Field()
  name!: string
  @Field({ nullable: true })
  description?: string
}
