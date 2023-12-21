import { AdminUpdateCollectionInput } from '@pubkey-link/sdk'
import { useWebSdk } from '@pubkey-link/web/shell/data-access'
import { showNotificationError, showNotificationSuccess } from '@pubkey-link/web/ui/notifications'
import { useQuery } from '@tanstack/react-query'

export function useAdminCollection(collectionId: string) {
  const sdk = useWebSdk()
  const query = useQuery({
    queryKey: ['admin', 'collections', 'get', collectionId],
    queryFn: () => sdk.adminFindOneCollection({ collectionId }).then((res) => res.data),
    retry: 0,
  })
  const collection = query.data?.item ?? undefined

  return {
    collection,
    query,
    syncCollection: async () =>
      sdk
        .adminSyncCollection({ collectionId })
        .then((res) => res.data)
        .then(async (res) => {
          if (res) {
            showNotificationSuccess(`${res.synced?.toString()}`, {
              title: 'Collection synced',
            })
            await query.refetch()
            return true
          }
          showNotificationError('Collection not synced')
          return false
        })
        .catch((err) => {
          showNotificationError(err.message)
          return false
        }),
    updateCollection: async (input: AdminUpdateCollectionInput) =>
      sdk
        .adminUpdateCollection({ collectionId, input })
        .then((res) => res.data)
        .then(async (res) => {
          if (res) {
            showNotificationSuccess('Collection updated')
            await query.refetch()
            return true
          }
          showNotificationError('Collection not updated')
          return false
        })
        .catch((err) => {
          showNotificationError(err.message)
          return false
        }),
  }
}
