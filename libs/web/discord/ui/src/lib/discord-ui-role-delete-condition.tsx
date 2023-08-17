import { ActionIcon, Tooltip } from '@mantine/core'
import { DiscordRoleCondition } from '@pubkey-link/sdk'
import { useWebSdk } from '@pubkey-link/web/shell/data-access'
import { showNotificationError, showNotificationSuccess } from '@pubkey-link/web/ui/notifications'
import { IconTrash } from '@tabler/icons-react'

export function DiscordUiRoleDeleteCondition({
  condition,
  refresh,
}: {
  condition: DiscordRoleCondition
  refresh: () => void
}) {
  const sdk = useWebSdk()

  return (
    <Tooltip label="Delete condition from role">
      <ActionIcon
        disabled={(condition.combos?.length ?? 0) > 0 || (condition.collections?.length ?? 0) > 0}
        size="xs"
        color="red"
        variant="subtle"
        onClick={() => {
          if (!condition.id) return
          sdk
            .adminDeleteDiscordRoleCondition({
              conditionId: condition.id,
            })
            .then((res) => {
              showNotificationSuccess('Condition removed')
              refresh()
            })
            .catch((err) => {
              console.log(err)
              showNotificationError('Error removing condition')
            })
        }}
      >
        <IconTrash size={16} />
      </ActionIcon>
    </Tooltip>
  )
}
