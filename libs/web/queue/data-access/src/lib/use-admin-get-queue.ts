import { QueueType } from '@pubkey-link/sdk'
import { useWebSdk } from '@pubkey-link/web/shell/data-access'
import { showNotificationError, showNotificationSuccess } from '@pubkey-link/web/ui/notifications'
import { useQuery } from '@tanstack/react-query'

export function useAdminGetQueue({ type }: { type: QueueType }) {
  const sdk = useWebSdk()

  const query = useQuery({
    queryKey: ['admin', 'get-queue', type],
    queryFn: async () => {
      return sdk.adminGetQueue({ type }).then((res) => res.data)
    },
  })

  function refresh() {
    query.refetch()
  }

  return {
    query,
    cleanQueue: ({ type }: { type: QueueType }) =>
      sdk
        .adminCleanQueue({ type })
        .then(() => {
          showNotificationSuccess('Queue cleaned')
          refresh()
        })
        .catch((err) => showNotificationError(err.message ?? 'Failed to clean queue')),
    pauseQueue: ({ type }: { type: QueueType }) =>
      sdk
        .adminPauseQueue({ type })
        .then(() => {
          showNotificationSuccess('Queue paused')
          refresh()
        })
        .catch((err) => showNotificationError(err.message ?? 'Failed to pause queue')),
    resumeQueue: ({ type }: { type: QueueType }) =>
      sdk
        .adminResumeQueue({ type })
        .then(() => {
          showNotificationSuccess('Queue resumed')
          refresh()
        })
        .catch((err) => showNotificationError(err.message ?? 'Failed to resume queue')),
  }
}
