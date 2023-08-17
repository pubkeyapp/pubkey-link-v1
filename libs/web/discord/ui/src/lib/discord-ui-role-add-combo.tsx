import { Button, Group, Select } from '@mantine/core'
import { CollectionCombo, DiscordRoleCondition } from '@pubkey-link/sdk'
import { useWebSdk } from '@pubkey-link/web/shell/data-access'
import { UiStack } from '@pubkey-link/web/ui/core'
import { showNotificationError, showNotificationSuccess } from '@pubkey-link/web/ui/notifications'
import { useMemo, useState } from 'react'

export function DiscordUiRoleAddCombo({
  condition,
  combos,
  refresh,
}: {
  condition: DiscordRoleCondition
  combos: CollectionCombo[]
  refresh: () => void
}) {
  const sdk = useWebSdk()
  const [comboId, setComboId] = useState<string | null>(null)

  const options = useMemo(
    () =>
      combos
        // Map to option
        .map((item) => ({ value: item.id, label: item.name }))
        // Filter out already added combos
        .filter((item) => !condition.combos?.find((combo) => combo.id === item.value)),
    [combos, condition.combos],
  )

  return (
    <UiStack>
      <Group>
        <Select
          disabled={!options?.length}
          placeholder="Select combo"
          data={options}
          value={comboId}
          onChange={(value) => {
            setComboId(value ? value : null)
          }}
        />
        <Button
          disabled={!comboId}
          onClick={() => {
            if (!condition.id || !comboId) return
            sdk
              .adminAddDiscordRoleConditionCombo({
                comboId,
                conditionId: condition.id,
              })
              .then((res) => {
                setComboId(null)
                refresh()
                showNotificationSuccess('Added combo to role condition')
              })
              .catch((err) => {
                console.log(err)
                showNotificationError('An error occurred')
              })
          }}
        >
          Add
        </Button>
      </Group>
    </UiStack>
  )
}
