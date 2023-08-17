import { ActionIcon, Tooltip } from '@mantine/core'
import { Collection, DiscordRoleCondition } from '@pubkey-link/sdk'
import { useWebSdk } from '@pubkey-link/web/shell/data-access'
import { showNotificationError, showNotificationSuccess } from '@pubkey-link/web/ui/notifications'
import { IconTrash } from '@tabler/icons-react'

export function DiscordUiRoleDeleteCollection({
  condition,
  collection,
  refresh,
}: {
  condition: DiscordRoleCondition
  collection: Collection
  refresh: () => void
}) {
  const sdk = useWebSdk()
  const hasCollectionCombo = condition.combos?.find((combo) => combo.collectionAccount === collection.account)

  return (
    <Tooltip label="Delete collection from condition">
      <ActionIcon
        disabled={!!hasCollectionCombo}
        size="xs"
        color="red"
        variant="subtle"
        onClick={() => {
          if (!condition.id) return
          sdk
            .adminRemoveDiscordRoleConditionCollection({
              conditionId: condition.id,
              collectionId: collection.id,
            })
            .then((res) => {
              showNotificationSuccess('Collection removed')
              refresh()
            })
            .catch((err) => {
              console.log(err)
              showNotificationError('Error removing collection')
            })
        }}
      >
        <IconTrash size={16} />
      </ActionIcon>
    </Tooltip>
  )
}
