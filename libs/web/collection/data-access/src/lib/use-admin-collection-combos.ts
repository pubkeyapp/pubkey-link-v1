import {
  AdminCreateCollectionComboInput,
  AdminFindCollectionCombosInput,
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
  const [take, setTake] = useState(10)
  const [skip, setSkip] = useState(0)
  const [search, setSearch] = useState<string>('')

  const input: AdminFindCollectionCombosInput = { network, skip, take, search, collectionId }
  const query = useQuery(['admin', 'collection-combos', 'find', input], () =>
    sdk.adminFindCollectionCombos({ input }).then((res) => res.data),
  )
  const total = query.data?.count?.total ?? 0

  return {
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
