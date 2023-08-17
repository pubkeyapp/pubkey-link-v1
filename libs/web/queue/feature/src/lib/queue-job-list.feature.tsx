import { Box, Button, Group, Stack } from '@mantine/core'
import { JobStatus, QueueType } from '@pubkey-link/sdk'
import { useAdminGetJobs } from '@pubkey-link/web/queue/data-access'
import { QueueJobList } from '@pubkey-link/web/queue/ui'
import { UiLoader } from '@pubkey-link/web/ui/core'

export function QueueJobListFeature({ type }: { type: QueueType }) {
  const { deleteJob, query, status, setStatus } = useAdminGetJobs({ type })

  return (
    <Stack spacing={24}>
      <Box>
        <Group>
          {Object.keys(JobStatus).map((item) => (
            <Button
              variant={item.toLowerCase() === status.toLowerCase() ? 'filled' : 'light'}
              key={item}
              onClick={() => setStatus(item as JobStatus)}
            >
              {item}
            </Button>
          ))}
        </Group>
      </Box>
      {query.isLoading ? (
        <UiLoader />
      ) : (
        <QueueJobList
          deleteJob={(jobId) => deleteJob({ type, jobId })}
          jobs={query?.data?.items ?? []}
          refresh={() => query.refetch()}
          status={status}
          type={type}
        />
      )}
    </Stack>
  )
}
