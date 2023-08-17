import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class DiscordServerChannel {
  @Field()
  id!: string
  @Field()
  name!: string
  @Field()
  type!: string
}
