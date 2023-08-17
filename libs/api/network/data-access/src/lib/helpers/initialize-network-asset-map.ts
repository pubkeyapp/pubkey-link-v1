import { NetworkType, Prisma } from '@prisma/client'

export type NetworkAssetMap = Record<NetworkType, Prisma.AssetCreateInput[]>

export function initializeNetworkAssetMap(networks: NetworkType[]): NetworkAssetMap {
  return networks.reduce((acc, network) => ({ ...acc, [network]: [] }), {} as NetworkAssetMap)
}
