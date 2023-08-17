import { JobStatus, QueueType } from '@pubkey-link/sdk'
import { useWebSdk } from '@pubkey-link/web/shell/data-access'
import { showNotificationError, showNotificationSuccess } from '@pubkey-link/web/ui/notifications'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export function useAdminGetQueues() {
  const sdk = useWebSdk()

  const query = useQuery({
    queryKey: ['admin', 'get-queues'],
    queryFn: async () => sdk.adminGetQueues().then((res) => res.data),
  })

  function refresh() {
    query.refetch()
  }

  return {
    query,
    refresh,
  }
}

export function useAdminGetJobs({ type }: { type: QueueType }) {
  const sdk = useWebSdk()
  const [status, setStatus] = useState<JobStatus>(JobStatus.Active)

  const query = useQuery({
    queryKey: ['admin', 'get-queue-jobs', type, status],
    queryFn: async () => {
      return sdk.adminGetQueueJobs({ type, statuses: [status.toLowerCase() as JobStatus] }).then((res) => res.data)
    },
  })

  return {
    query,
    status,
    setStatus,
    deleteJob: ({ type, jobId }: { type: QueueType; jobId: string }) => {
      return sdk
        .adminDeleteQueueJob({ type, jobId })
        .then(() => {
          showNotificationSuccess('Job deleted')
        })
        .catch((err) => {
          showNotificationError(err.message ?? 'Failed to delete job')
        })
    },
  }
}
