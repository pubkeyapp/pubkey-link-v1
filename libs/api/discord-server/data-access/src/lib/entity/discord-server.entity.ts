import { Field, ObjectType } from '@nestjs/graphql'
import { DiscordRole } from './discord-role.entity.entity'

@ObjectType()
export class DiscordServer {
  @Field()
  id!: string
  @Field({ nullable: true })
  name!: string
  @Field({ nullable: true })
  icon!: string
  @Field({ nullable: true })
  owner!: boolean
  @Field({ nullable: true })
  botChannel!: string
  @Field({ nullable: true })
  permissions?: number
  @Field()
  enabled!: boolean
  @Field()
  enableSync!: boolean
  @Field(() => [String], { nullable: true })
  features!: string[]
  @Field(() => [DiscordRole], { nullable: true })
  roles!: DiscordRole[]
}
