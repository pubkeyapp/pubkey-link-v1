import { AdminCreateCollectionInput, AdminFindCollectionsInput, NetworkType } from '@pubkey-link/sdk'
import { useWebSdk } from '@pubkey-link/web/shell/data-access'

import { useUiPagination } from '@pubkey-link/web/ui/core'
import { showNotificationError, showNotificationSuccess } from '@pubkey-link/web/ui/notifications'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export function useAdminCollections() {
  const sdk = useWebSdk()
  const [network, setNetwork] = useState<NetworkType | undefined>(undefined)

  const [take, setTake] = useState(10)
  const [skip, setSkip] = useState(0)
  const [search, setSearch] = useState<string>('')

  const input: AdminFindCollectionsInput = { network, skip, take, search }
  const query = useQuery(['admin', 'collections', 'find', input], () =>
    sdk.adminFindCollections({ input }).then((res) => res.data),
  )
  const total = query.data?.count?.total ?? 0
  const items = query.data?.items ?? []

  return {
    collectionOptions: items.map((item) => ({
      label: item.name,
      value: item.account ?? '',
    })),
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
