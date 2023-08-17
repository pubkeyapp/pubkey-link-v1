import { AdminFindAssetsInput, NetworkType } from '@pubkey-link/sdk'
import { useWebSdk } from '@pubkey-link/web/shell/data-access'

import { useUiPagination } from '@pubkey-link/web/ui/core'
import { showNotificationSuccess } from '@pubkey-link/web/ui/notifications'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export function useAdminAssets(props: { network?: NetworkType | null; collectionAccount?: string | null } = {}) {
  const sdk = useWebSdk()
  const [network, setNetwork] = useState<NetworkType | undefined>(props.network ?? undefined)
  const [collectionAccount, setCollectionAccount] = useState<string | undefined>(props.collectionAccount ?? undefined)
  const [take, setTake] = useState(12)
  const [skip, setSkip] = useState(0)
  const [search, setSearch] = useState<string>('')

  const input: AdminFindAssetsInput = { network, skip, take, search, collectionAccount }
  const query = useQuery(['admin', 'users', 'find', input], () =>
    sdk.adminFindAssets({ input }).then((res) => res.data),
  )
  const total = query.data?.count?.total ?? 0

  return {
    deleteAsset: (assetId: string) =>
      sdk.adminDeleteAsset({ assetId }).then(() => {
        showNotificationSuccess('Asset deleted')
        return query.refetch()
      }),
    query,
    collectionAccount,
    setCollectionAccount,
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
