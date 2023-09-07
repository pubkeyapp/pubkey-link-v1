import { Field, InputType } from '@nestjs/graphql'
import { PagingInput } from '@pubkey-link/api/core/data-access'
import { NetworkType } from '../entity/network-type.entity'

@InputType()
export class AdminFindManyNetworkInput extends PagingInput() {
  @Field(() => NetworkType, { nullable: true })
  type!: NetworkType
  @Field({ nullable: true })
  search?: string
}
