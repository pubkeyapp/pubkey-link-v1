import { ObjectType } from '@nestjs/graphql'
import { PagingResponse } from '@pubkey-link/api/core/data-access'
import { Collection } from './collection.entity'

@ObjectType()
export class CollectionPaging extends PagingResponse<Collection>(Collection) {}
