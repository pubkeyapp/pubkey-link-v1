import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class AdminUpdateNetworkInput {
  @Field()
  endpoint?: string
  @Field()
  name?: string
}
