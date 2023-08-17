import { NetworkType, UserFindCollectionsInput } from '@pubkey-link/sdk'
import { useWebSdk } from '@pubkey-link/web/shell/data-access'
import { useUiPagination } from '@pubkey-link/web/ui/core'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export function useUserCollections() {
  const sdk = useWebSdk()
  const [network, setNetwork] = useState<NetworkType | undefined>(undefined)

  const [take, setTake] = useState(10)
  const [skip, setSkip] = useState(0)
  const [search, setSearch] = useState<string>('')

  const input: UserFindCollectionsInput = { network, skip, take, search }
  const query = useQuery(['user', 'collections', 'find', input], () =>
    sdk.userFindCollections({ input }).then((res) => res.data),
  )
  const total = query.data?.count?.total ?? 0

  return {
    query,
    network,
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
