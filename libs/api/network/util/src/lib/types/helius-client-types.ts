import { NetworkType } from '@prisma/client'
import { DAS } from 'helius-sdk'

export interface HeliusClientTypes {
  total: number
  created: number
  skipped: number
  updated: number
}

export interface HeliusClientConfig {
  apiKey: string
  type: NetworkType
}

export interface GetAssetsByGroupOptions {
  collectionAccount: string
  page?: number
  limit?: number
}

export interface GetAllAssetsByOwnerOptions {
  ownerAccount: string
}
export interface GetAssetsByOwnerOptions {
  ownerAccount: string
  page?: number
  limit?: number
}

export interface GetCollectionAssetsByOwnerOptions {
  collectionAccounts: string[]
  ownerAccount: string
}
export interface GetCollectionAssetsOptions {
  account: string
  cb: (items: DAS.GetAssetResponse[]) => Promise<HeliusClientTypes>
}
