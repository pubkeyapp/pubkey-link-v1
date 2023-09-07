import {
  AdminCreateCollectionComboInput,
  AdminFindManyCollectionComboInput,
  AssetAttributeInput,
  NetworkType,
} from '@pubkey-link/sdk'
import { useWebSdk } from '@pubkey-link/web/shell/data-access'

import { useUiPagination } from '@pubkey-link/web/ui/core'
import { showNotificationError, showNotificationSuccess } from '@pubkey-link/web/ui/notifications'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export function useAdminCollectionCombos(props: { collectionId: string }) {
  const sdk = useWebSdk()
  const [network, setNetwork] = useState<NetworkType | undefined>(undefined)
  const [collectionId] = useState<string>(props.collectionId)
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState<string>('')

  const input: AdminFindManyCollectionComboInput = { network, page, limit, search, collectionId }
  const query = useQuery({
    queryKey: ['admin', 'collection-combos', 'find', input],
    queryFn: () => sdk.adminFindManyCollectionCombo({ input }).then((res) => res.data),
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
    createCollectionCombo: (input: AdminCreateCollectionComboInput) =>
      sdk
        .adminCreateCollectionCombo({
          input: {
            ...input,
            collectionId: props.collectionId,
          },
        })
        .then((res) => res.data)
        .then((res) => {
          if (res.created) {
            showNotificationSuccess(`CollectionCombo  created`)
          } else {
            showNotificationError(`CollectionCombo not created`)
          }
          return res.created
        })
        .catch((err) => {
          showNotificationError(err.message)
          return undefined
        }),
    addAttribute: (collectionComboId: string, input: AssetAttributeInput) =>
      sdk.adminAddCollectionComboAttribute({ collectionComboId, input }).then(() => {
        showNotificationSuccess('Attribute added')
        return query.refetch()
      }),
    deleteCollectionCombo: (collectionComboId: string) =>
      sdk.adminDeleteCollectionCombo({ collectionComboId }).then(() => {
        showNotificationSuccess('CollectionCombo deleted')
        return query.refetch()
      }),
    removeAttribute: (collectionComboId: string, assetAttributeId: string) =>
      sdk.adminRemoveCollectionComboAttribute({ collectionComboId, assetAttributeId }).then(() => {
        showNotificationSuccess('Attribute removed')
        return query.refetch()
      }),
  }
}

export function useAdminCollectionCombo(props: { collectionComboId: string }) {
  const sdk = useWebSdk()

  const [collectionComboId] = useState<string>(props.collectionComboId)

  return {
    addAttribute: (input: AssetAttributeInput) =>
      sdk.adminAddCollectionComboAttribute({ collectionComboId, input }).then(() => {
        showNotificationSuccess('Attribute added')
        return
      }),
    removeAttribute: (collectionComboId: string, assetAttributeId: string) =>
      sdk.adminRemoveCollectionComboAttribute({ collectionComboId, assetAttributeId }).then(() => {
        showNotificationSuccess('Attribute removed')
        return
      }),
  }
}
