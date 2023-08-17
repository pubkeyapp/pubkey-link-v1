import { AdminCreateNetworkInput, AdminFindNetworksInput, NetworkType } from '@pubkey-link/sdk'
import { useWebSdk } from '@pubkey-link/web/shell/data-access'

import { useUiPagination } from '@pubkey-link/web/ui/core'
import { showNotificationError, showNotificationSuccess } from '@pubkey-link/web/ui/notifications'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export function useAdminNetworks() {
  const sdk = useWebSdk()
  const [type, setType] = useState<NetworkType | undefined>(undefined)

  const [take, setTake] = useState(10)
  const [skip, setSkip] = useState(0)
  const [search, setSearch] = useState<string>('')

  const input: AdminFindNetworksInput = { type, skip, take, search }
  const query = useQuery(['admin', 'users', 'find', input], () =>
    sdk.adminFindNetworks({ input }).then((res) => res.data),
  )
  const total = query.data?.count?.total ?? 0

  return {
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
    query,
    type,
    setType,
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
