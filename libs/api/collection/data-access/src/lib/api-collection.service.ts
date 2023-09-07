import { Injectable } from '@nestjs/common'
import { ApiAssetService } from '@pubkey-link/api/asset/data-access'
import { ApiCoreService } from '@pubkey-link/api/core/data-access'
import { ApiNetworkService } from '@pubkey-link/api/network/data-access'

import { ApiCollectionAdminService } from './api-collection-admin.service'
import { ApiCollectionQueueService } from './api-collection-queue.service'
import { ApiCollectionUserService } from './api-collection-user.service'

@Injectable()
export class ApiCollectionService {
  constructor(
    readonly admin: ApiCollectionAdminService,
    readonly user: ApiCollectionUserService,
    private readonly core: ApiCoreService,
    private readonly asset: ApiAssetService,
    private readonly network: ApiNetworkService,
    private readonly queue: ApiCollectionQueueService,
  ) {}

  async syncCollections(adminId: string) {
    await this.core.ensureUserAdmin(adminId)
    throw new Error('Syncing collections is currently disabled')
    const collections = await this.core.data.collection.findMany()
    if (!collections.length) {
      throw new Error('No collections found')
    }
    await this.queue.scheduleCollectionSyncMany({ collections })
    return true
  }

  async syncCollection(adminId: string, collectionId: string) {
    await this.core.ensureUserAdmin(adminId)
    throw new Error('Syncing collections is currently disabled')
    const collection = await this.admin.findOneCollection(adminId, collectionId)
    if (!collection) {
      throw new Error(`Collection ${collectionId} not found`)
    }
    await this.queue.scheduleCollectionSyncOne({ collection })
    return true
  }
}
