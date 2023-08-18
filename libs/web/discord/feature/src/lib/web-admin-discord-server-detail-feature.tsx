import { Button, Group } from '@mantine/core'
import { useAdminGetDiscordServer } from '@pubkey-link/web/discord/data-access'
import { DiscordUiServerAvatar, DiscordUiServerTitle } from '@pubkey-link/web/discord/ui'
import { useWebSdk } from '@pubkey-link/web/shell/data-access'
import { UiAdminPage, UiAlert, UiBack, UiDebugModal, UiLoader, UiTabRoutes } from '@pubkey-link/web/ui/core'
import { showNotificationError, showNotificationSuccess } from '@pubkey-link/web/ui/notifications'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { DiscordServerDetailTabConditions } from './discord-server-detail-tab-conditions'
import { DiscordServerDetailTabRoles } from './discord-server-detail-tab-roles'
import { DiscordServerDetailTabSettings } from './discord-server-detail-tab-settings'

export function WebAdminDiscordServerDetailFeature() {
  const { serverId } = useParams() as { serverId: string }
  const [syncing, setSyncing] = useState(false)
  const query = useAdminGetDiscordServer(serverId)
  const sdk = useWebSdk()

  const server = query.data?.item

  function syncRoles() {
    setSyncing(true)
    sdk
      .adminSyncDiscordRoles({ serverId })
      .then((res) => {
        showNotificationSuccess('Synced')
        return query.refetch()
      })
      .catch((err) => {
        console.log(err)
        showNotificationError('An error occurred')
      })
      .finally(() => setSyncing(false))
  }

  if (query.isLoading) {
    return <UiLoader />
  }

  return (
    <UiAdminPage
      title={
        server?.name ? (
          <Group align="center">
            <DiscordUiServerAvatar item={server} size="md" />
            <DiscordUiServerTitle item={server} />
          </Group>
        ) : (
          '...'
        )
      }
      leftAction={<UiBack />}
      rightAction={
        <Group>
          <UiDebugModal data={server} />
          <Button
            disabled={!server?.botChannel}
            onClick={() =>
              sdk
                .adminTestDiscordServerBotChannel({ serverId: server?.id as string })
                .then(() => {
                  showNotificationSuccess('Test sent')
                  return true
                })
                .catch((err) => {
                  console.error(err)
                  showNotificationError('An error occurred')
                  return false
                })
            }
          >
            Test Bot Channel
          </Button>
          <Button disabled={!server?.enabled} loading={syncing} onClick={() => syncRoles()}>
            Sync Roles
          </Button>
        </Group>
      }
    >
      {server?.enabled ? (
        <UiTabRoutes
          tabs={[
            {
              value: 'conditions',
              label: 'Conditions',
              component: server ? <DiscordServerDetailTabConditions server={server} /> : <UiLoader />,
            },
            {
              value: 'roles',
              label: 'Discord Roles',
              component: server ? <DiscordServerDetailTabRoles server={server} /> : <UiLoader />,
            },
            {
              value: 'settings',
              label: 'Settings',
              component: server ? (
                <DiscordServerDetailTabSettings server={server} refresh={() => query.refetch()} />
              ) : (
                <UiLoader />
              ),
            },
          ]}
        />
      ) : (
        <UiAlert
          variant="outline"
          color="yellow"
          message="This server is not enabled. You can enable it by inviting the bot to your server."
        />
      )}
    </UiAdminPage>
  )
}
