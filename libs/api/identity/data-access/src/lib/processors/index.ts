import { IdentitySyncManyProcessor } from './identity-sync-many.processor'
import { IdentitySyncOneProcessor } from './identity-sync-one.processor'

export const processors = [
  //
  IdentitySyncManyProcessor,
  IdentitySyncOneProcessor,
]

export { IdentitySyncManyQueueData } from './identity-sync-many.processor'
export { IdentitySyncOneQueueData } from './identity-sync-one.processor'
