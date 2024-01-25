import { Accordion, Button, Group, Text } from '@mantine/core'
import { useWebSdk } from '@pubkey-link/web/shell/data-access'
import { UiAlert, UiCard, UiCardTitle, UiDebug, UiGroup, UiLoader, UiStack } from '@pubkey-link/web/ui/core'
import { showNotificationError, showNotificationSuccess } from '@pubkey-link/web/ui/notifications'

import { useMutation, useQuery } from '@tanstack/react-query'

export function WebDevBackupFeature() {
  const sdk = useWebSdk()
  const query = useQuery({
    queryKey: ['backup', 'get-backups'],
    queryFn: () => sdk.adminGetBackups(),
  })
  const mutationCreate = useMutation({
    mutationKey: ['backup', 'create'],
    mutationFn: () => sdk.adminCreateBackup(),
  })
  const mutationFetch = useMutation({
    mutationKey: ['backup', 'fetch'],
    mutationFn: (url: string) => sdk.adminFetchBackup({ url }),
  })

  return (
    <UiCard>
      <UiStack>
        <UiGroup>
          <UiCardTitle>Backup</UiCardTitle>
          <Group>
            <Button
              onClick={() => {
                const url = window.prompt('Enter backup url')
                if (!url) return
                return mutationFetch
                  .mutateAsync(url)
                  .then(async (res) => {
                    if (res.data.fetched) {
                      showNotificationSuccess('Backup fetched')
                      await query.refetch()
                      return
                    }
                    showNotificationError('Backup fetch failed')
                    await query.refetch()
                  })
                  .catch((err) => showNotificationError(`Error: ${err.message}`))
              }}
            >
              Fetch Backup
            </Button>
            <Button
              onClick={() =>
                mutationCreate
                  .mutateAsync()
                  .then(async (res) => {
                    if (res.data.created) {
                      showNotificationSuccess('Backup created')
                      await query.refetch()
                      return
                    }
                    showNotificationError('Backup failed')
                    await query.refetch()
                  })
                  .catch((err) => showNotificationError(`Error: ${err.message}`))
              }
            >
              Create Backup
            </Button>
          </Group>
        </UiGroup>
        {query.isLoading ? (
          <UiLoader />
        ) : query.data?.data.items ? (
          <Accordion multiple variant="separated">
            {query.data?.data.items.map((name) => (
              <Accordion.Item key={name} value={name}>
                <Accordion.Control>
                  <Text ff="mono">{name}</Text>
                </Accordion.Control>
                <Accordion.Panel>
                  <DevBackupPanel name={name} refresh={() => query.refetch()} />
                </Accordion.Panel>
              </Accordion.Item>
            ))}
          </Accordion>
        ) : (
          <UiAlert message={<div>No backups found</div>} />
        )}
      </UiStack>
    </UiCard>
  )
}

export function DevBackupPanel({ name, refresh }: { name: string; refresh: () => void }) {
  const sdk = useWebSdk()
  const query = useQuery({
    queryKey: ['backup', 'get-backup', { name }],
    queryFn: () => sdk.adminGetBackup({ name }).then((res) => res.data),
    enabled: false,
  })
  const mutationDelete = useMutation({
    mutationKey: ['backup', 'delete', { name }],
    mutationFn: () => sdk.adminDeleteBackup({ name }).then((res) => res.data),
  })

  const mutationRestore = useMutation({
    mutationKey: ['backup', 'restore', { name }],
    mutationFn: () => sdk.adminRestoreBackup({ name }).then((res) => res.data),
  })

  return (
    <UiStack>
      <UiDebug data={query.data?.item ?? 'None'} open />
      <Group position="right">
        <Button onClick={() => query.refetch()} disabled={query.isLoading}>
          Get Backup Info
        </Button>
        <Button
          onClick={() => {
            if (!window.confirm('Are you sure?')) return
            return mutationDelete
              .mutateAsync()
              .then(async (res) => {
                if (res?.deleted) {
                  showNotificationSuccess('Backup deleted')
                  refresh()
                  return
                }
                showNotificationError('Backup failed')
                refresh()
              })
              .catch((err) => showNotificationError(`Error: ${err.message}`))
          }}
        >
          Delete
        </Button>
        <Button
          onClick={() =>
            mutationRestore
              .mutateAsync()
              .then(async (res) => {
                if (res?.restored) {
                  showNotificationSuccess('Backup restored')
                  refresh()
                  return
                }
                showNotificationError('Backup failed')
                refresh()
              })
              .catch((err) => showNotificationError(`Error: ${err.message}`))
          }
        >
          Restore
        </Button>
      </Group>
    </UiStack>
  )
}
