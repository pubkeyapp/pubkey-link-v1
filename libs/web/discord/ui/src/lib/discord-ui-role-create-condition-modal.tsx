import { Button, Group } from '@mantine/core'
import { modals } from '@mantine/modals'
import { DiscordRole } from '@pubkey-link/sdk'
import { useWebSdk } from '@pubkey-link/web/shell/data-access'
import { UiStack } from '@pubkey-link/web/ui/core'
import { showNotificationError, showNotificationSuccess } from '@pubkey-link/web/ui/notifications'
import { useState } from 'react'
import { DiscordUiRoleSelect } from './discord-ui-role-select'

export function DiscordUiRoleCreateConditionModal({ refresh, roles }: { refresh: () => void; roles: DiscordRole[] }) {
  return (
    <Group>
      <Button
        onClick={() => {
          modals.open({
            title: 'Add Condition',
            children: <DiscordRoleAddCondition refresh={refresh} roles={roles} />,
          })
        }}
      >
        Add Condition
      </Button>
    </Group>
  )
}

export function DiscordRoleAddCondition({ refresh, roles }: { refresh: () => void; roles: DiscordRole[] }) {
  const [roleId, setRoleId] = useState<string | null>(null)
  const sdk = useWebSdk()

  return (
    <UiStack>
      <p>Select a role to create a condition for</p>
      <DiscordUiRoleSelect roles={roles} select={setRoleId} />

      <Button
        disabled={!roleId}
        size="xs"
        variant="light"
        onClick={() => {
          if (!roleId) return
          sdk
            .adminCreateDiscordRoleCondition({ roleId })
            .then((res) => {
              refresh()
              showNotificationSuccess('Added new role condition')
            })
            .catch((err) => {
              console.log(err)
              showNotificationError('An error occurred')
            })
        }}
      >
        Create Condition
      </Button>
    </UiStack>
  )
}
