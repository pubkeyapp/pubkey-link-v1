import { Field, Int, ObjectType } from '@nestjs/graphql'
import { CollectionCombo } from '@pubkey-link/api/collection-combo/data-access'
import { Collection } from '@pubkey-link/api/collection/data-access'

@ObjectType()
export class DiscordRoleCondition {
  @Field({ nullable: true })
  id!: string
  @Field({ nullable: true })
  createdAt!: Date
  @Field({ nullable: true })
  updatedAt!: Date
  @Field(() => Int, { nullable: true })
  collectionsAmount!: number
  @Field(() => [Collection], { nullable: true })
  collections?: Collection[]
  @Field(() => Int, { nullable: true })
  combosAmount!: number
  @Field(() => [CollectionCombo], { nullable: true })
  combos?: CollectionCombo[]
}
