import { registerEnumType } from '@nestjs/graphql'

export enum QueueType {
  AssetSyncMany = 'AssetSyncMany',
  AssetUpsertMany = 'AssetUpsertMany',
  CollectionSyncOne = 'CollectionSyncOne',
  IdentitySyncMany = 'IdentitySyncMany',
  IdentitySyncOne = 'IdentitySyncOne',
}

registerEnumType(QueueType, { name: 'QueueType' })
