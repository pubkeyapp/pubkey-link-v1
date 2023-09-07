import { Injectable } from '@nestjs/common'
import { ApiCoreService } from '@pubkey-link/api/core/data-access'
import { ApiNetworkService } from '@pubkey-link/api/network/data-access'
import { UserFindManyAssetInput } from './dto/user-find-many-asset.input'
import { AssetPaging } from './entity/asset-paging'
import { getUserAssetWhereInput } from './helpers/get-user-asset-where-input'

@Injectable()
export class ApiAssetUserService {
  constructor(private readonly core: ApiCoreService, private readonly network: ApiNetworkService) {}

  async findManyAsset(userId: string, input: UserFindManyAssetInput): Promise<AssetPaging> {
    await this.core.ensureUserActive(userId)

    return this.core.data.asset
      .paginate({
        where: getUserAssetWhereInput(userId, input),
        orderBy: { name: 'asc' },
        include: {
          collection: true,
          identity: { include: { owner: true } },
        },
      })
      .withPages({ limit: input.limit, page: input.page })
      .then(([data, meta]) => ({ data, meta }))
  }

  async findOneAsset(userId: string, assetId: string) {
    await this.core.ensureUserActive(userId)
    const found = await this.core.data.asset.findUnique({
      where: { id: assetId },
      include: {
        collection: true,
        identity: true,
      },
    })
    if (!found) {
      throw new Error(`Asset ${assetId} not found`)
    }
    return found
  }
}
