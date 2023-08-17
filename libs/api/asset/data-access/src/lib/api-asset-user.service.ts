import { Injectable, Logger } from '@nestjs/common'
import { Asset as PrismaAsset } from '@prisma/client'
import { ApiCoreService, Paging } from '@pubkey-link/api/core/data-access'
import { ApiNetworkService } from '@pubkey-link/api/network/data-access'
import { UserFindAssetsInput } from './dto/user-find-assets.input'
import { parseUserFindAssetsInput } from './helpers/parse-user-find-assets.input'

@Injectable()
export class ApiAssetUserService {
  private readonly logger = new Logger(ApiAssetUserService.name)

  constructor(private readonly core: ApiCoreService, private readonly network: ApiNetworkService) {}

  async findAssets(userId: string, input: UserFindAssetsInput): Promise<PrismaAsset[]> {
    await this.core.ensureUserActive(userId)

    const { where, orderBy, take, skip, include } = parseUserFindAssetsInput(userId, input)
    const items = await this.core.data.asset.findMany({ where, orderBy, take, skip, include })

    return items ?? []
  }

  async findAssetsCount(userId: string, input: UserFindAssetsInput): Promise<Paging> {
    await this.core.ensureUserActive(userId)

    const { where, orderBy, take, skip } = parseUserFindAssetsInput(userId, input)
    const [count, total] = await Promise.all([
      this.core.data.asset.count({ where, orderBy, take, skip }),
      this.core.data.asset.count({ where, orderBy }),
    ])

    return { count, skip, take, total }
  }

  async getAsset(userId: string, assetId: string) {
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
