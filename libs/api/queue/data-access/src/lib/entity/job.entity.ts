import { Field, Int, ObjectType } from '@nestjs/graphql'
import { GraphQLJSON } from 'graphql-scalars'

@ObjectType()
export class Job {
  @Field(() => String, { nullable: true })
  id?: string
  @Field(() => GraphQLJSON, { nullable: true })
  data: unknown
  @Field(() => GraphQLJSON, { nullable: true })
  opts: unknown
  @Field(() => Int, { nullable: true })
  attemptsMade: number
  @Field({ nullable: true })
  processedOn?: Date | undefined
  @Field({ nullable: true })
  finishedOn?: Date | undefined
  @Field({ nullable: true })
  timestamp: Date
  @Field(() => Int, { nullable: true })
  duration?: number
  @Field(() => String, { nullable: true })
  name: string
  @Field(() => [String], { nullable: true })
  stacktrace: string[]
  @Field(() => GraphQLJSON, { nullable: true })
  returnvalue: unknown
  @Field(() => String, { nullable: true })
  failedReason?: string | undefined
}
