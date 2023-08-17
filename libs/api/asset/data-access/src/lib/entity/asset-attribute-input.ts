import { Field, InputType, Int } from '@nestjs/graphql'

@InputType()
export class AssetAttributeInput {
  @Field()
  key!: string
  @Field()
  value!: string
  @Field(() => Int, { nullable: true })
  count?: number
}
