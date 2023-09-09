import { Field, ObjectType } from '@nestjs/graphql'
import { DiscordRoleCondition } from './discord-role-condition.entity'

@ObjectType()
export class DiscordRole {
  @Field()
  id!: string
  @Field()
  name!: string
  @Field({ nullable: true })
  permissions!: string
  @Field({ nullable: true })
  color!: number
  @Field({ nullable: true })
  hoist!: boolean
  @Field({ nullable: true })
  position!: number
  @Field({ nullable: true })
  managed!: boolean
  @Field({ nullable: true })
  mentionable!: boolean
  @Field({ nullable: true })
  serverId!: string
  @Field(() => [DiscordRoleCondition], { nullable: true })
  conditions?: DiscordRoleCondition[]
}
