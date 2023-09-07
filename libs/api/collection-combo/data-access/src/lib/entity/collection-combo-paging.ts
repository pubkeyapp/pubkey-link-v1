import { ObjectType } from '@nestjs/graphql'
import { PagingResponse } from '@pubkey-link/api/core/data-access'
import { CollectionCombo } from './collection-combo.entity'

@ObjectType()
export class CollectionComboPaging extends PagingResponse<CollectionCombo>(CollectionCombo) {}
