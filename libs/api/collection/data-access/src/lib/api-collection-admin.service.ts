import { Injectable, Logger } from '@nestjs/common'
import { Collection as PrismaCollection } from '@prisma/client'
import { ApiCoreService, Paging } from '@pubkey-link/api/core/data-access'
import { ApiNetworkService } from '@pubkey-link/api/network/data-access'

import { AdminCreateCollectionInput } from './dto/admin-create-collection.input'
import { AdminFindCollectionsInput } from './dto/admin-find-collections.input'
import { AdminUpdateCollectionInput } from './dto/admin-update-collection.input'
import { parseAdminFindCollectionsInput } from './helpers/parse-admin-find-collections.input'

@Injectable()
export class ApiCollectionAdminService {
  private readonly logger = new Logger(ApiCollectionAdminService.name)
  constructor(private readonly core: ApiCoreService, private readonly network: ApiNetworkService) {}

  async createCollection(adminId: string, input: AdminCreateCollectionInput): Promise<PrismaCollection> {
    await this.core.ensureUserAdmin(adminId)
    const found = await this.core.data.collection.findUnique({
      where: {
        account_network: { account: input.account, network: input.network },
      },
    })
    if (found) {
      throw new Error(`Collection ${input.network} => ${input.account} already exists`)
    }
    const created = await this.core.data.collection.create({
      data: {
        ...input,
      },
    })
    if (!created) {
      throw new Error(`Collection ${input.network} => ${input.account} not created`)
    } else {
      this.logger.verbose(`Collection ${input.network} => ${input.account} created`)
    }
    return created
  }

  async deleteCollection(adminId: string, collectionId: string): Promise<boolean> {
    await this.core.ensureUserAdmin(adminId)
    const found = await this.core.data.collection.findUnique({ where: { id: collectionId } })
    if (!found) {
      throw new Error(`Collection ${collectionId} not found`)
    }
    const deleted = await this.core.data.collection.delete({ where: { id: collectionId } })
    if (!deleted) {
      throw new Error(`Collection ${collectionId} not deleted`)
    }
    return true
  }

  async findCollections(adminId: string, input: AdminFindCollectionsInput): Promise<PrismaCollection[]> {
    await this.core.ensureUserAdmin(adminId)

    const { where, orderBy, take, skip } = parseAdminFindCollectionsInput(input)
    const items = await this.core.data.collection.findMany({ where, orderBy, take, skip })

    return items ?? []
  }

  async findCollectionsCount(adminId: string, input: AdminFindCollectionsInput): Promise<Paging> {
    await this.core.ensureUserAdmin(adminId)

    const { where, orderBy, take, skip } = parseAdminFindCollectionsInput(input)
    const [count, total] = await Promise.all([
      this.core.data.collection.count({ where, orderBy, take, skip }),
      this.core.data.collection.count({ where, orderBy }),
    ])

    return { count, skip, take, total }
  }

  async getCollection(adminId: string, collectionId: string) {
    await this.core.ensureUserAdmin(adminId)
    const found = await this.core.data.collection.findUnique({
      where: { id: collectionId },
      include: { combos: { include: { attributes: true } }, attributes: true },
    })
    if (!found) {
      throw new Error(`Collection ${collectionId} not found`)
    }
    return found
  }

  async updateCollection(
    adminId: string,
    collectionId: string,
    input: AdminUpdateCollectionInput,
  ): Promise<PrismaCollection> {
    await this.core.ensureUserAdmin(adminId)
    const found = await this.core.data.collection.findUnique({ where: { id: collectionId } })
    if (!found) {
      throw new Error(`Collection ${collectionId} not found`)
    }
    const updated = await this.core.data.collection.update({
      where: { id: collectionId },
      data: { ...input },
    })
    if (!updated) {
      throw new Error(`Collection ${collectionId} not updated`)
    }
    return updated
  }
}
