import { Injectable, Logger } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { ApiCoreService } from '@pubkey-link/api/core/data-access'
import { ApiNetworkService } from '@pubkey-link/api/network/data-access'
import { ApiCollectionQueueService } from './api-collection-queue.service'

@Injectable()
export class ApiCollectionSyncService {
  private readonly logger = new Logger(ApiCollectionSyncService.name)
  constructor(
    private readonly core: ApiCoreService,
    readonly network: ApiNetworkService,
    private readonly queue: ApiCollectionQueueService,
  ) {}

  async syncCollections(adminId: string) {
    await this.core.ensureUserAdmin(adminId)
    throw new Error('Syncing collections is currently disabled')
    // FIXME: The deep syncing of the entire collection is currently disabled
    // const collections = await this.core.data.collection.findMany()
    // if (!collections.length) {
    //   throw new Error('No collections found')
    // }
    // await this.queue.scheduleCollectionSyncMany({ collections })
    // return true
  }

  async syncCollection(adminId: string, collectionId: string) {
    await this.core.ensureUserAdmin(adminId)
    await this.updateCollectionMetadata(adminId, collectionId)
    // FIXME: The deep syncing of the entire collection is currently disabled
    // throw new Error('Syncing collections is currently disabled')
    // const collection = await this.findOneCollection(adminId, collectionId)
    // if (!collection) {
    //   throw new Error(`Collection ${collectionId} not found`)
    // }
    // await this.queue.scheduleCollectionSyncOne({ collection })
    return true
  }

  private async findOneCollection(collectionId: string) {
    const found = await this.core.data.collection.findUnique({
      where: { id: collectionId },
      include: { combos: { include: { attributes: true } }, attributes: true },
    })
    if (!found) {
      throw new Error(`Collection ${collectionId} not found`)
    }
    return found
  }

  async updateCollectionMetadata(adminId: string, collectionId: string) {
    await this.core.ensureUserAdmin(adminId)
    const collection = await this.findOneCollection(collectionId)
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
