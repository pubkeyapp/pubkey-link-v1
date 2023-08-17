import { Injectable, Logger } from '@nestjs/common'
import { Asset as PrismaAsset } from '@prisma/client'
import { ApiCoreService, Paging } from '@pubkey-link/api/core/data-access'
import { ApiNetworkService } from '@pubkey-link/api/network/data-access'
import { AdminFindAssetsInput } from './dto/admin-find-assets.input'
import { parseAdminFindAssetsInput } from './helpers/parse-admin-find-assets.input'

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

  async findAssets(adminId: string, input: AdminFindAssetsInput): Promise<PrismaAsset[]> {
    await this.core.ensureUserAdmin(adminId)

    const { where, orderBy, take, skip, include } = parseAdminFindAssetsInput(input)
    const items = await this.core.data.asset.findMany({ where, orderBy, take, skip, include })

    return items ?? []
  }

  async findAssetsCount(adminId: string, input: AdminFindAssetsInput): Promise<Paging> {
    await this.core.ensureUserAdmin(adminId)

    const { where, orderBy, take, skip } = parseAdminFindAssetsInput(input)
    const [count, total] = await Promise.all([
      this.core.data.asset.count({ where, orderBy, take, skip }),
      this.core.data.asset.count({ where, orderBy }),
    ])

    return { count, skip, take, total }
  }

  async getAsset(adminId: string, assetId: string) {
    await this.core.ensureUserAdmin(adminId)
    const found = await this.core.data.asset.findUnique({ where: { id: assetId } })
    if (!found) {
      throw new Error(`Asset ${assetId} not found`)
    }
    return found
  }
}
