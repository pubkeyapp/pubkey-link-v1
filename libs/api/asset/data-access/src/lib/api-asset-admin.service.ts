import { Injectable, Logger } from '@nestjs/common'
import { ApiCoreService } from '@pubkey-link/api/core/data-access'
import { ApiNetworkService } from '@pubkey-link/api/network/data-access'
import { AdminFindManyAssetInput } from './dto/admin-find-many-asset.input'
import { AssetPaging } from './entity/asset-paging'
import { getAdminASsetWhereInput } from './helpers/get-admin-a-sset-where-input'

@Injectable()
export class ApiAssetAdminService {
  private readonly logger = new Logger(ApiAssetAdminService.name)
  constructor(private readonly core: ApiCoreService, private readonly network: ApiNetworkService) {}

  async deleteAsset(adminId: string, assetId: string): Promise<boolean> {
    await this.core.ensureUserAdmin(adminId)
    const found = await this.core.data.asset.findUnique({ where: { id: assetId } })
    if (!found) {
      throw new Error(`Asset ${assetId} not found`)
    }
    const deleted = await this.core.data.asset.delete({ where: { id: assetId } })
    if (!deleted) {
      throw new Error(`Asset ${assetId} not deleted`)
    }
    return true
  }

  async findManyAsset(adminId: string, input: AdminFindManyAssetInput): Promise<AssetPaging> {
    await this.core.ensureUserAdmin(adminId)

    return this.core.data.asset
      .paginate({
        include: { identity: { include: { owner: true } } },
        orderBy: [{ identityId: 'asc' }, { name: 'asc' }],
        where: getAdminASsetWhereInput(input),
      })
      .withPages({ limit: input.limit, page: input.page })
      .then(([data, meta]) => ({ data, meta }))
  }

  async findOneAsset(adminId: string, assetId: string) {
    await this.core.ensureUserAdmin(adminId)
    const found = await this.core.data.asset.findUnique({ where: { id: assetId } })
    if (!found) {
      throw new Error(`Asset ${assetId} not found`)
    }
    return found
  }
}
