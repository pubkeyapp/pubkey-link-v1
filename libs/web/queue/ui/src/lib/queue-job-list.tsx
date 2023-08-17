import { Alert, Box, Button, Code, Group, Stack, Text } from '@mantine/core'
import { Job, JobStatus, QueueType } from '@pubkey-link/sdk'
import { UiDebugModal } from '@pubkey-link/web/ui/core'
import { IconTrash } from '@tabler/icons-react'

export function QueueJobList({
  deleteJob,
  jobs,
  status,
  refresh,
  type,
}: {
  deleteJob: (jobId: string) => void
  jobs: Job[]
  refresh: () => void
  status: JobStatus
  type: QueueType
}) {
  return (
    <Stack>
      {!jobs?.length ? (
        <Alert color="b">
          The {type} queue has no {status} jobs
        </Alert>
      ) : (
        <Stack>
          <Alert color="info">
            The {type} queue has {jobs?.length} {status} jobs
          </Alert>

          <Box>
            {jobs?.map((job) => (
              <Box key={job.id}>
                <Stack mb={2}>
                  <Group>
                    <Button>
                      <IconTrash
                        onClick={() => {
                          deleteJob(`${job.id}`)
                          refresh()
                        }}
                      />
                    </Button>
                    <Box>
                      <Code>{job.id}</Code>
                    </Box>
                    <UiDebugModal data={job} />
                  </Group>
                  {job.failedReason ? <Alert color="red">{job.failedReason}</Alert> : null}
                </Stack>
                <Box pb={4}>
                  {job.stacktrace?.length ? (
                    <Stack>
                      <Text size="lg">Stack Trace</Text>
                      <Box component="pre" p="2" fz="xs">
                        {job.stacktrace}
                      </Box>
                    </Stack>
                  ) : null}
                </Box>
              </Box>
            ))}
          </Box>
        </Stack>
      )}
    </Stack>
  )
}
