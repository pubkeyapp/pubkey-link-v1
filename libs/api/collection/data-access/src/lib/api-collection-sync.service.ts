import { Injectable, Logger } from '@nestjs/common'
import { Cron } from '@nestjs/schedule'
import { Prisma } from '@prisma/client'
import { ApiCoreService } from '@pubkey-link/api/core/data-access'
import { ApiNetworkService } from '@pubkey-link/api/network/data-access'
import { env } from 'node:process'
import { ApiCollectionQueueService } from './api-collection-queue.service'

@Injectable()
export class ApiCollectionSyncService {
  private readonly logger = new Logger(ApiCollectionSyncService.name)
  constructor(
    private readonly core: ApiCoreService,
    readonly network: ApiNetworkService,
    private readonly queue: ApiCollectionQueueService,
  ) {}

  @Cron(env['SYNC_COLLECTIONS_INTERVAL'] as string)
  async syncCollections() {
    if (!this.core.config.syncCollections) {
      this.logger.debug(`syncCollections: syncCollections is false, skipping`)
      return
    }
    const collections = await this.core.data.collection.findMany({ where: { enableSync: true } })
    if (!collections.length) {
      this.logger.debug(`syncCollections: no collections found with enableSync=true, skipping`)
      return
    }
    for (const collection of collections) {
      this.logger.debug(`syncCollections: scheduling collection ${collection.id} sync`)
      await this.queue.scheduleCollectionSyncOne({ collection })
    }
  }

  async syncCollection(adminId: string, collectionId: string) {
    await this.core.ensureUserAdmin(adminId)
    await this.updateCollectionMetadata(collectionId)
    if (!this.core.config.syncCollections) {
      const msg = `Syncing collections is currently disabled for this server. Set SYNC_COLLECTIONS=true to enable.`
      this.logger.verbose(msg)
      return msg
    }
    const collection = await this.core.data.collection.findUnique({ where: { id: collectionId } })
    if (!collection) {
      throw new Error(`Collection ${collectionId} not found`)
    }
    if (!collection.enableSync) {
      const msg = `Collection ${collectionId} sync is disabled. Set enableSync to enable.`
      this.logger.verbose(msg)
      return msg
    }
    await this.queue.scheduleCollectionSyncOne({ collection })
    return `Syncing collection ${collectionId}`
  }

  private async updateCollectionMetadata(collectionId: string) {
    const collection = await this.core.data.collection.findUnique({ where: { id: collectionId } })
    if (!collection) {
      throw new Error(`Collection ${collectionId} not found`)
    }
    const metadata = await this.network.getTokenMetadata(collection.network, collection.account)
    if (!metadata || !metadata.length) {
      throw new Error(`Metadata for collection ${collectionId} not found`)
    }
    if (!metadata[0]?.offChainMetadata?.metadata) {
      return true
    }

    const data = metadata[0].offChainMetadata as {
      metadata: { name: string; image: string; external_url: string; description: string; symbol: string }
      uri: string
    }

    const input: Prisma.CollectionUpdateInput = {
      description: data.metadata.description,
      imageUrl: data.metadata.image,
      metadataUrl: data.uri,
      name: data.metadata.name,
      symbol: data.metadata.symbol,
    }

    const updateInput: Prisma.CollectionUpdateInput = Object.keys(input).reduce((acc, key) => {
      const value = input[key as keyof typeof input] as string
      if (value !== collection[key as keyof typeof collection]) {
        acc[key] = value
      }
      return acc
    }, {} as { [key: string]: string })

    if (!Object.keys(updateInput).length) {
      return true
    }

    const updated = await this.core.data.collection.update({
      where: { id: collection.id },
      data: updateInput,
    })
    this.logger.verbose(`Updated collection ${collectionId} metadata: ${JSON.stringify(updateInput, null, 2)}`)
    return !!updated
  }
}
