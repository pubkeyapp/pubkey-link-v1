import { Alert, Badge, Box, Button, Group, Paper, Stack, Tooltip } from '@mantine/core'
import { QueueType } from '@pubkey-link/sdk'
import { useAdminGetQueue } from '@pubkey-link/web/queue/data-access'
import { QueueCountStats } from '@pubkey-link/web/queue/ui'
import { UiAdminPage, UiBack, UiCard, UiLoader, UiStack } from '@pubkey-link/web/ui/core'
import { IconPlayerPause, IconPlayerPlay, IconRefresh, IconTrash } from '@tabler/icons-react'
import { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'

import { QueueJobListFeature } from './queue-job-list.feature'

const DEFAULT_TIMEOUT = 5000

export function QueueDetailFeature() {
  const [timeout, setTimeout] = useState(DEFAULT_TIMEOUT)
  const { type } = useParams<{ type: string }>()
  const { query, cleanQueue, resumeQueue, pauseQueue } = useAdminGetQueue({ type: type as QueueType })

  // FIXME: use useInterval hook from @mantine/hooks
  useEffect(() => {
    if (!type) return

    const timer = setInterval(() => query.refetch(), timeout)

    return () => clearInterval(timer)
  }, [timeout, type])

  useEffect(() => {
    if (!query.data?.item || query.data?.item?.isPaused || (query.data?.item?.count?.waiting ?? 0) < 1) {
      if (timeout !== DEFAULT_TIMEOUT) {
        console.log('Setting timeout to 5 seconds')
        setTimeout(DEFAULT_TIMEOUT)
      }
      return
    }
    if (timeout !== 1000) {
      console.log('Setting timeout to 1 second')
      setTimeout(1000)
    }
  }, [query.data?.item?.count, query.data?.item?.isPaused, timeout])

  if (!query.data?.item && query.isLoading) {
    return <UiLoader />
  }

  if (!query.data?.item) {
    return <Alert color="red">Queue not found :(</Alert>
  }

  return (
    <UiAdminPage title={`${query.data?.item?.name}`} leftAction={<UiBack />}>
      <UiStack>
        <UiCard>
          <Group position="apart">
            <Box>
              <Badge>{query.data?.item?.isPaused ? 'Paused' : 'Started'}</Badge>
            </Box>

            <Group>
              {query.data?.item?.isPaused ? (
                <Button onClick={() => resumeQueue({ type: type as QueueType })} leftIcon={<IconPlayerPlay />}>
                  Resume
                </Button>
              ) : (
                <Button onClick={() => pauseQueue({ type: type as QueueType })} leftIcon={<IconPlayerPause />}>
                  Pause
                </Button>
              )}
              <Tooltip label={`Automatic refresh each ${timeout / 1000} seconds`}>
                <Button onClick={() => query.refetch()} leftIcon={<IconRefresh />}>
                  Refresh
                </Button>
              </Tooltip>
              <Tooltip label={`This will remove all the jobs from the queue.`}>
                <Button onClick={() => cleanQueue({ type: type as QueueType })} leftIcon={<IconTrash />}>
                  Clean
                </Button>
              </Tooltip>
            </Group>
          </Group>
        </UiCard>
        {query.data?.item?.count ? (
          <UiCard>
            <QueueCountStats count={query.data?.item.count} />
          </UiCard>
        ) : null}
        {query.data?.item?.info ? (
          <UiCard>
            <Box component="pre" p="2" fz="xs">
              {JSON.stringify(query.data?.item?.info, null, 2)}
            </Box>
          </UiCard>
        ) : null}
        <UiCard>{query.data?.item.type ? <QueueJobListFeature type={query.data?.item.type} /> : null}</UiCard>
      </UiStack>
    </UiAdminPage>
  )
}
