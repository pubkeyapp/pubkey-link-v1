import { Injectable, Logger } from '@nestjs/common'
import { Collection as PrismaCollection } from '@prisma/client'
import { ApiCoreService } from '@pubkey-link/api/core/data-access'
import { fetchStakedTokens } from '@pubkey-link/api/network/util'
import { ApiCollectionSyncService } from './api-collection-sync.service'

import { AdminCreateCollectionInput } from './dto/admin-create-collection.input'
import { AdminFindManyCollectionInput } from './dto/admin-find-many-collection-input'
import { AdminUpdateCollectionInput } from './dto/admin-update-collection.input'
import { CollectionPaging } from './entity/collection-paging'
import { getAdminCollectionWhereInput } from './helpers/get-admin-collection-where-input'

@Injectable()
export class ApiCollectionAdminService {
  private readonly logger = new Logger(ApiCollectionAdminService.name)
  constructor(private readonly core: ApiCoreService, readonly sync: ApiCollectionSyncService) {}

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
    const metadata = await this.sync.network.getTokenMetadata(input.network, input.account)
    if (!metadata?.length || !metadata[0]?.offChainMetadata?.metadata) {
      throw new Error(`Collection ${input.network} => ${input.account} not found`)
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
    await this.sync.syncCollection(adminId, created.id)
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

  async findManyCollection(adminId: string, input: AdminFindManyCollectionInput): Promise<CollectionPaging> {
    await this.core.ensureUserAdmin(adminId)

    return this.core.data.collection
      .paginate({
        orderBy: { name: 'asc' },
        where: getAdminCollectionWhereInput(input),
      })
      .withPages({ limit: input.limit, page: input.page })
      .then(([data, meta]) => ({ data, meta }))
  }

  async findOneCollection(adminId: string, collectionId: string) {
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
    if (input.vaultId) {
      const res = await fetchStakedTokens(input.vaultId)
      if (!res.length) {
        throw new Error(`Vault ${input.vaultId} has no assets`)
      }
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
