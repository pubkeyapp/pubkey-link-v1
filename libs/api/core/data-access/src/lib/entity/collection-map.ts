import { NetworkType } from '@prisma/client'

export type CollectionMap = Record<NetworkType, CollectionMapItem[]>
export type CollectionMapItem = { account: string; vaultId?: string }
