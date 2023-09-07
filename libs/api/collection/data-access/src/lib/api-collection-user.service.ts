import { Injectable, Logger } from '@nestjs/common'
import { ApiCoreService } from '@pubkey-link/api/core/data-access'
import { ApiNetworkService } from '@pubkey-link/api/network/data-access'
import { UserFindManyCollectionInput } from './dto/user-find-many-collection-input'
import { CollectionPaging } from './entity/collection-paging'
import { getUserCollectionWhereInput } from './helpers/get-user-collection-where-input'

@Injectable()
export class ApiCollectionUserService {
  private readonly logger = new Logger(ApiCollectionUserService.name)

  constructor(private readonly core: ApiCoreService, private readonly network: ApiNetworkService) {}

  async findManyCollection(userId: string, input: UserFindManyCollectionInput): Promise<CollectionPaging> {
    await this.core.ensureUserActive(userId)

    return this.core.data.collection
      .paginate({
        include: { combos: { include: { attributes: true } } },
        orderBy: { updatedAt: 'desc' },
        where: getUserCollectionWhereInput(input),
      })
      .withPages({ limit: input.limit, page: input.page })
      .then(([data, meta]) => ({ data, meta }))
  }

  async findOneCollection(userId: string, collectionId: string) {
    await this.core.ensureUserActive(userId)
    const found = await this.core.data.collection.findUnique({
      where: { id: collectionId },
      include: { combos: { include: { attributes: true } } },
    })
    if (!found) {
      throw new Error(`Collection ${collectionId} not found`)
    }
    return found
  }
}
