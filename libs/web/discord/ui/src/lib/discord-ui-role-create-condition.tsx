import { Button, Tooltip } from '@mantine/core'
import { DiscordRole } from '@pubkey-link/sdk'
import { useWebSdk } from '@pubkey-link/web/shell/data-access'
import { showNotificationError, showNotificationSuccess } from '@pubkey-link/web/ui/notifications'

export function DiscordUiRoleCreateCondition({ role, refresh }: { role: DiscordRole; refresh: () => void }) {
  const sdk = useWebSdk()
  return (
    <Tooltip label="Add a new condition for role">
      <Button
        size="xs"
        variant="light"
        onClick={() => {
          if (!role.id) return
          sdk
            .adminCreateDiscordRoleCondition({ roleId: role.id })
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
        Add Condition
      </Button>
    </Tooltip>
  )
}
