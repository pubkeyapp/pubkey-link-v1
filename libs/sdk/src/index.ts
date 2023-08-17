import { Asset, AssetAttribute, Collection } from './generated/graphql-sdk'

export * from './generated/graphql-sdk'
export * from './lib/response-middleware'
export * from './lib/get-graphql-client'
export * from './lib/get-graphql-sdk'
export * from './lib/verify-signature'

export function sortAssetAttributesByCount(items: AssetAttribute[]): AssetAttribute[] {
  return items.sort((a, b) => (b.count ?? 0) - (a.count ?? 0))
}

export type AssetGroup = { collection: Collection; assets: Asset[] }

export function groupAssetsByCollection(items: Asset[]): AssetGroup[] {
  const result: AssetGroup[] = []
  for (const asset of items) {
    const item = result.find(({ collection }) => collection?.id === asset.collection?.id)
    if (item) {
      item.assets.push(asset)
    } else {
      result.push({ collection: asset.collection as Collection, assets: [asset] })
    }
  }
  return result
}
export function ellipsify(str = '', len = 4) {
  if (str.length > 30) {
    return str.substring(0, len) + '..' + str.substring(str.length - len, str.length)
  }
  return str
}
