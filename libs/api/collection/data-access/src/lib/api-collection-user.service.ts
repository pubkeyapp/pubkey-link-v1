import { Injectable, Logger } from '@nestjs/common'
import { Collection as PrismaCollection } from '@prisma/client'
import { ApiCoreService, Paging } from '@pubkey-link/api/core/data-access'
import { ApiNetworkService } from '@pubkey-link/api/network/data-access'
import { UserFindCollectionsInput } from './dto/user-find-collections.input'

import { parseUserFindCollectionsInput } from './helpers/parse-user-find-collections.input'

@Injectable()
export class ApiCollectionUserService {
  private readonly logger = new Logger(ApiCollectionUserService.name)

  constructor(private readonly core: ApiCoreService, private readonly network: ApiNetworkService) {}

  async findCollections(userId: string, input: UserFindCollectionsInput): Promise<PrismaCollection[]> {
    await this.core.ensureUserActive(userId)

    const { where, orderBy, take, skip, include } = parseUserFindCollectionsInput(input)
    const items = await this.core.data.collection.findMany({ where, orderBy, take, skip, include })

    return items ?? []
  }

  async findCollectionsCount(userId: string, input: UserFindCollectionsInput): Promise<Paging> {
    await this.core.ensureUserActive(userId)

    const { where, orderBy, take, skip } = parseUserFindCollectionsInput(input)
    const [count, total] = await Promise.all([
      this.core.data.collection.count({ where, orderBy, take, skip }),
      this.core.data.collection.count({ where, orderBy }),
    ])

    return { count, skip, take, total }
  }

  async getCollection(userId: string, collectionId: string) {
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
