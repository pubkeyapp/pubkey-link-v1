import { Cluster } from '@solana/web3.js'
import { DAS } from 'helius-sdk'

export interface AssetCount {
  total: number
  created: number
  skipped: number
  updated: number
}

export interface HeliusClientConfig {
  apiKey: string
  cluster: Cluster
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
  cb: (items: DAS.GetAssetResponse[]) => Promise<AssetCount>
}
