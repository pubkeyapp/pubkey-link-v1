import { ObjectType } from '@nestjs/graphql'
import { PagingResponse } from '@pubkey-link/api/core/data-access'
import { Asset } from './asset.entity'

@ObjectType()
export class AssetPaging extends PagingResponse<Asset>(Asset) {}
