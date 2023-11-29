import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class AdminUpdateDiscordServerInput {
  @Field(() => [String], { nullable: true })
  adminIds!: string[]
  @Field({ nullable: true })
  botChannel?: string
  @Field({ nullable: true })
  enableSync?: boolean
}
