import { AdminUpdateNetworkInput, AdminCreateNetworkTokenInput } from '@pubkey-link/sdk'
import { useWebSdk } from '@pubkey-link/web/shell/data-access'
import { showNotificationError, showNotificationSuccess } from '@pubkey-link/web/ui/notifications'
import { useQuery } from '@tanstack/react-query'

export function useAdminFindOneNetwork({ networkId }: { networkId: string }) {
  const sdk = useWebSdk()
  const query = useQuery(
    ['admin', 'networks', 'get', networkId],
    () => sdk.adminFindOneNetwork({ networkId }).then((res) => res.data),
    { retry: 0 },
  )
  const network = query.data?.item ?? undefined

  return {
    network,
    query,
    createNetworkToken: async (input: AdminCreateNetworkTokenInput) =>
      sdk
        .adminCreateNetworkToken({ input: { ...input, network: network?.type } })
        .then((res) => res.data)
        .then(async (res) => {
          if (res) {
            showNotificationSuccess('Network token created')
            await query.refetch()
            return true
          }
          showNotificationError('Network token not created')
          return !!res
        })
        .catch((err) => {
          showNotificationError(err.message)
          return false
        }),
    deleteNetworkToken: async (networkTokenId: string) =>
      sdk
        .adminDeleteNetworkToken({ networkTokenId })
        .then((res) => res.data)
        .then(async (res) => {
          if (res) {
            showNotificationSuccess('Network token deleted')
            await query.refetch()
            return true
          }
          showNotificationError('Network token not deleted')
          return false
        })
        .catch((err) => {
          showNotificationError(err.message)
          return false
        }),
    updateNetwork: async (input: AdminUpdateNetworkInput) =>
      sdk
        .adminUpdateNetwork({ networkId, input })
        .then((res) => res.data)
        .then(async (res) => {
          if (res) {
            showNotificationSuccess('Network updated')
            await query.refetch()
            return true
          }
          showNotificationError('Network not updated')
          return false
        })
        .catch((err) => {
          showNotificationError(err.message)
          return false
        }),
  }
}
