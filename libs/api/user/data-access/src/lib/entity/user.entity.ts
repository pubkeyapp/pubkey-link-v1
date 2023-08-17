import { Field, HideField, ObjectType } from '@nestjs/graphql'
import { UserRole } from './user-role.entity'
import { UserStatus } from './user-status.entity'

@ObjectType()
export class User {
  @Field()
  id!: string
  @Field({ nullable: true })
  createdAt?: Date
  @Field({ nullable: true })
  updatedAt?: Date

  @Field(() => UserRole, { nullable: true })
  role?: UserRole
  @Field(() => UserStatus, { nullable: true })
  status?: UserStatus

  @Field({ nullable: true })
  allowDm?: boolean
  @Field({ nullable: true })
  avatarUrl?: string
  @Field({ nullable: true })
  developer?: boolean
  @Field({ nullable: true })
  language?: string
  @Field({ nullable: true })
  location?: string
  @Field({ nullable: true })
  name?: string
  @Field({ nullable: true })
  username?: string
  @Field({ nullable: true })
  verified?: boolean

  @HideField()
  groups?: unknown[]
  @HideField()
  interests?: unknown[]

  @Field({ nullable: true })
  description?: string
  @Field({ nullable: true })
  devType?: string
  @Field({ nullable: true })
  devStack?: string
  @Field({ nullable: true })
  devYears?: string
  @Field({ nullable: true })
  twitterUrl?: string
  @Field({ nullable: true })
  telegramUrl?: string
  @Field({ nullable: true })
  discordUrl?: string
  @Field({ nullable: true })
  githubUrl?: string
  @Field({ nullable: true })
  websiteUrl?: string
}
