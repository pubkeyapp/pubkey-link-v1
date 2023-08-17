import { CollectionSyncManyProcessor } from './collection-sync-many.processor'
import { CollectionSyncOneProcessor } from './collection-sync-one.processor'

export const processors = [
  //
  CollectionSyncManyProcessor,
  CollectionSyncOneProcessor,
]

export { CollectionSyncManyQueueData } from './collection-sync-many.processor'
export { CollectionSyncOneQueueData } from './collection-sync-one.processor'
