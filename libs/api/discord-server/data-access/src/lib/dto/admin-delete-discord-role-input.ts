import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class AdminDeleteDiscordRoleInput {
  @Field()
  serverId!: string
  @Field()
  roleId!: string
}
