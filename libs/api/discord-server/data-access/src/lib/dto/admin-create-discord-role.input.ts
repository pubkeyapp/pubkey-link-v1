import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class AdminCreateDiscordRoleInput {
  @Field()
  serverId!: string
  @Field()
  name!: string
}
