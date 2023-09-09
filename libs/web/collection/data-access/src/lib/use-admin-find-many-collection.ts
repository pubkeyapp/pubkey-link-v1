import { AdminCreateCollectionInput, AdminFindManyCollectionInput, NetworkType } from '@pubkey-link/sdk'
import { useWebSdk } from '@pubkey-link/web/shell/data-access'

import { useUiPagination } from '@pubkey-link/web/ui/core'
import { showNotificationError, showNotificationSuccess } from '@pubkey-link/web/ui/notifications'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export function useAdminFindManyCollection() {
  const sdk = useWebSdk()
  const [network, setNetwork] = useState<NetworkType | undefined>(undefined)

  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState<string>('')

  const input: AdminFindManyCollectionInput = { network, page, limit, search }
  const query = useQuery({
    queryKey: ['admin', 'collections', 'find', input],
    queryFn: () => sdk.adminFindManyCollection({ input }).then((res) => res.data),
  })
  const total = query.data?.paging.meta.totalCount ?? 0
  const items = query.data?.paging.data ?? []

  return {
    items,
    collectionOptions: items.map((item) => ({
      label: `${item.name ?? item.account}`,
      value: item.account ?? '',
    })),
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
    createCollection: (input: AdminCreateCollectionInput) =>
      sdk
        .adminCreateCollection({ input })
        .then((res) => res.data)
        .then((res) => {
          if (res.created) {
            showNotificationSuccess(`Collection  created`)
          } else {
            showNotificationError(`Collection not created`)
          }
          return res.created
        })
        .catch((err) => {
          showNotificationError(err.message)
          return undefined
        }),
    deleteCollection: (collectionId: string) =>
      sdk.adminDeleteCollection({ collectionId }).then(() => {
        showNotificationSuccess('Collection deleted')
        return query.refetch()
      }),
    syncCollections: () =>
      sdk
        .adminSyncCollections()
        .then((res) => res.data)
        .then((res) => {
          if (res.synced) {
            showNotificationSuccess(`Collections synced`)
          } else {
            showNotificationError(`Collections not synced`)
          }
          return res.synced
        })
        .catch((err) => showNotificationError(err.message)),
  }
}
