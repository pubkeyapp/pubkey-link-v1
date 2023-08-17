import { ActionIcon, Tooltip } from '@mantine/core'
import { CollectionCombo, DiscordRoleCondition } from '@pubkey-link/sdk'
import { useWebSdk } from '@pubkey-link/web/shell/data-access'
import { showNotificationError, showNotificationSuccess } from '@pubkey-link/web/ui/notifications'
import { IconTrash } from '@tabler/icons-react'

export function DiscordUiRoleDeleteCombo({
  condition,
  combo,
  refresh,
}: {
  condition: DiscordRoleCondition
  combo: CollectionCombo
  refresh: () => void
}) {
  const sdk = useWebSdk()

  return (
    <Tooltip label={'Delete combo from condition'}>
      <ActionIcon
        size="xs"
        color="red"
        variant="subtle"
        onClick={() => {
          if (!condition.id) return
          sdk
            .adminRemoveDiscordRoleConditionCombo({
              conditionId: condition.id,
              comboId: combo.id,
            })
            .then((res) => {
              showNotificationSuccess('Combo removed')
              refresh()
            })
            .catch((err) => {
              console.log(err)
              showNotificationError('Error removing combo')
            })
        }}
      >
        <IconTrash size={16} />
      </ActionIcon>
    </Tooltip>
  )
}
