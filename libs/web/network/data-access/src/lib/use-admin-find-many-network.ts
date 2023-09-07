import { AdminCreateNetworkInput, AdminFindManyNetworkInput, NetworkType } from '@pubkey-link/sdk'
import { useWebSdk } from '@pubkey-link/web/shell/data-access'
import { useUiPagination } from '@pubkey-link/web/ui/core'
import { showNotificationError, showNotificationSuccess } from '@pubkey-link/web/ui/notifications'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export function useAdminFindManyNetwork() {
  const sdk = useWebSdk()
  const [type, setType] = useState<NetworkType | undefined>(undefined)

  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState<string>('')

  const input: AdminFindManyNetworkInput = { type, page, limit, search }
  const query = useQuery({
    queryKey: ['admin', 'find-many-network', input],
    queryFn: () => sdk.adminFindManyNetwork({ input }).then((res) => res.data),
  })
  const total = query.data?.paging.meta.totalCount ?? 0
  const items = query.data?.paging.data ?? []

  return {
    items,
    query,
    type,
    setType,
    setSearch,
    pagination: useUiPagination({
      page,
      setPage,
      limit,
      setLimit,
      total,
    }),
    createNetwork: (input: AdminCreateNetworkInput) =>
      sdk
        .adminCreateNetwork({ input })
        .then((res) => res.data)
        .then((res) => {
          if (res.created) {
            showNotificationSuccess(`Network  created`)
          } else {
            showNotificationError(`Network not created`)
          }
          return res.created
        })
        .catch((err) => {
          showNotificationError(err.message)
          return undefined
        }),
    deleteNetwork: (networkId: string) =>
      sdk.adminDeleteNetwork({ networkId }).then(() => {
        showNotificationSuccess('Network deleted')
        return query.refetch()
      }),
  }
}
