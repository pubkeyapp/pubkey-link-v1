import { AdminFindManyAssetInput, NetworkType } from '@pubkey-link/sdk'
import { useWebSdk } from '@pubkey-link/web/shell/data-access'
import { useUiPagination } from '@pubkey-link/web/ui/core'
import { showNotificationSuccess } from '@pubkey-link/web/ui/notifications'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export function useAdminFindManyAsset(props: { network?: NetworkType | null; collectionAccount?: string | null } = {}) {
  const sdk = useWebSdk()
  const [network, setNetwork] = useState<NetworkType | undefined>(props.network ?? undefined)
  const [collectionAccount, setCollectionAccount] = useState<string | undefined>(props.collectionAccount ?? undefined)
  const [limit, setLimit] = useState(12)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState<string>('')

  const input: AdminFindManyAssetInput = { network, page, limit, search, collectionAccount }
  const query = useQuery({
    queryKey: ['admin', 'users', 'find', input],
    queryFn: () => sdk.adminFindManyAsset({ input }).then((res) => res.data),
  })
  const total = query.data?.paging.meta.totalCount ?? 0
  const items = query.data?.paging.data ?? []

  return {
    items,
    query,
    collectionAccount,
    setCollectionAccount,
    network,
    setNetwork,
    setSearch,
    deleteAsset: (assetId: string) =>
      sdk.adminDeleteAsset({ assetId }).then(() => {
        showNotificationSuccess('Asset deleted')
        return query.refetch()
      }),
    pagination: useUiPagination({
      page,
      setPage,
      limit,
      setLimit,
      total,
    }),
  }
}
