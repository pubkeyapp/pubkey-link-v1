import {
  AssetAttributeInput,
  AssetGroup,
  groupAssetsByCollection,
  NetworkType,
  UserFindManyAssetInput,
} from '@pubkey-link/sdk'
import { useWebAuth } from '@pubkey-link/web/auth/data-access'
import { useWebSdk } from '@pubkey-link/web/shell/data-access'

import { useUiPagination } from '@pubkey-link/web/ui/core'
import { useQuery } from '@tanstack/react-query'
import { useMemo, useState } from 'react'

export function useUserFindManyAsset(
  props: {
    network?: NetworkType | null
    collectionAccount?: string | null
    attributes?: AssetAttributeInput[]
  } = {},
) {
  const { user } = useWebAuth()
  const sdk = useWebSdk()
  const [attributes, setAttributes] = useState<AssetAttributeInput[] | undefined>(props.attributes ?? undefined) // [{ key: 'name', value: 'test' }
  const [network, setNetwork] = useState<NetworkType | undefined>(props.network ?? undefined)
  const [ownerId, setOwnerId] = useState<string | undefined>(user?.id ?? undefined)
  const [collectionAccount, setCollectionAccount] = useState<string | undefined>(props.collectionAccount ?? undefined)
  const [limit, setLimit] = useState(1000)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState<string>('')

  const input: UserFindManyAssetInput = {
    network,
    page,
    limit,
    search,
    collectionAccount,
    ownerId,
    attributes: attributes?.map((a) => ({ key: a.key, value: a.value })),
  }
  const query = useQuery({
    queryKey: ['user', 'assets', 'find', input],
    queryFn: () => sdk.userFindManyAsset({ input }).then((res) => res.data),
  })
  const total = query.data?.paging.meta.totalCount ?? 0
  const items = query.data?.paging.data ?? []
  const collections: AssetGroup[] = useMemo(
    () => groupAssetsByCollection(items).sort((a, b) => a.collection.name.localeCompare(b.collection.name)),
    [items],
  )

  return {
    items,
    query,
    attributes,
    setAttributes,
    collections,
    collectionAccount,
    setCollectionAccount,
    network,
    ownerId,
    setOwnerId,
    setNetwork,
    setSearch,
    pagination: useUiPagination({
      page,
      setPage,
      limit,
      setLimit,
      total,
    }),
  }
}
