import { Field, InputType } from '@nestjs/graphql'
import { PagingInput } from '@pubkey-link/api/core/data-access'

@InputType()
export class AdminFindManyDiscordServerInput extends PagingInput() {
  @Field({ nullable: true })
  search?: string
}
