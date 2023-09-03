import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class AdminReportDiscordMemberWalletsInput {
  @Field()
  collectionAccount!: string
  @Field()
  serverId!: string
}
