import { JobStatus, QueueCount } from '@pubkey-link/sdk'
import { JobStatusGrid } from './job-status-grid'

export function QueueCountStats({ count }: { count: QueueCount }) {
  const data: { label: JobStatus; value: number }[] = [
    { label: JobStatus.Active, value: count.active ?? 0 },
    { label: JobStatus.Waiting, value: count.waiting ?? 0 },
    { label: JobStatus.Completed, value: count.completed ?? 0 },
    { label: JobStatus.Paused, value: count.paused ?? 0 },
    { label: JobStatus.Failed, value: count.failed ?? 0 },
    { label: JobStatus.Delayed, value: count.delayed ?? 0 },
  ]
  return <JobStatusGrid data={data} />
}
