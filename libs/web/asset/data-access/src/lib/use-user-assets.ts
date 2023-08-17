import {
  AssetAttributeInput,
  AssetGroup,
  groupAssetsByCollection,
  NetworkType,
  UserFindAssetsInput,
} from '@pubkey-link/sdk'
import { useWebAuth } from '@pubkey-link/web/auth/data-access'
import { useWebSdk } from '@pubkey-link/web/shell/data-access'

import { useUiPagination } from '@pubkey-link/web/ui/core'
import { useQuery } from '@tanstack/react-query'
import { useMemo, useState } from 'react'

export function useUserAssets(
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
  const [take, setTake] = useState(1000)
  const [skip, setSkip] = useState(0)
  const [search, setSearch] = useState<string>('')

  const input: UserFindAssetsInput = {
    network,
    skip,
    take,
    search,
    collectionAccount,
    ownerId,
    attributes: attributes?.map((a) => ({ key: a.key, value: a.value })),
  }
  const query = useQuery(['user', 'assets', 'find', input], () => sdk.userFindAssets({ input }).then((res) => res.data))
  const total = query.data?.count?.total ?? 0

  const collections: AssetGroup[] = useMemo(
    () =>
      groupAssetsByCollection(query.data?.items ?? []).sort((a, b) =>
        a.collection.name.localeCompare(b.collection.name),
      ),
    [query.data?.items],
  )

  return {
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
      skip,
      setSkip,
      take,
      setTake,
      total,
    }),
  }
}
