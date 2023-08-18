import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class AdminUpdateDiscordServerInput {
  @Field({ nullable: true })
  botChannel?: string
  @Field({ nullable: true })
  enableSync?: boolean
}
