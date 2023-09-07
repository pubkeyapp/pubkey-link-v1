import { NetworkType, UserFindManyCollectionInput } from '@pubkey-link/sdk'
import { useWebSdk } from '@pubkey-link/web/shell/data-access'
import { useUiPagination } from '@pubkey-link/web/ui/core'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export function useUserFindManyCollection() {
  const sdk = useWebSdk()
  const [network, setNetwork] = useState<NetworkType | undefined>(undefined)

  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState<string>('')

  const input: UserFindManyCollectionInput = { network, page, limit, search }
  const query = useQuery({
    queryKey: ['user', 'find-many-collection', input],
    queryFn: () => sdk.userFindManyCollection({ input }).then((res) => res.data),
  })
  const total = query.data?.paging.meta.totalCount ?? 0
  const items = query.data?.paging.data ?? []

  return {
    items,
    query,
    network,
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
