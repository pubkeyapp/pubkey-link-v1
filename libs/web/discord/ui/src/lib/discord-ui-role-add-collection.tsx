import { Button, Group, Select } from '@mantine/core'
import { DiscordRoleCondition } from '@pubkey-link/sdk'
import { useUserFindManyCollection } from '@pubkey-link/web/collection/data-access'
import { useWebSdk } from '@pubkey-link/web/shell/data-access'
import { showNotificationError, showNotificationSuccess } from '@pubkey-link/web/ui/notifications'
import { useMemo, useState } from 'react'

export function DiscordUiRoleAddCollection({
  condition,
  refresh,
}: {
  condition: DiscordRoleCondition
  refresh: () => void
}) {
  const sdk = useWebSdk()
  const [collectionId, setCollectionId] = useState<string | null>(null)
  const { query } = useUserFindManyCollection()
  const items = query.data?.paging.data ?? []

  const options = useMemo(
    () =>
      items
        // Map to option
        .map((item) => ({ value: item.id, label: item.name })),
    // Filter out already added collections
    // .filter((item) => !condition.collections?.find((collection) => collection.id === item.value)),
    [items, condition.collections],
  )

  return (
    <Group>
      <Select
        size="sm"
        disabled={!options?.length}
        data={options ?? []}
        value={collectionId}
        placeholder="Add collection"
        onChange={(value) => {
          setCollectionId(value ? value : null)
        }}
      />
      <Button
        disabled={!collectionId}
        onClick={() => {
          if (!condition.id || !collectionId) return
          sdk
            .adminAddDiscordRoleConditionCollection({
              collectionId,
              conditionId: condition.id,
            })
            .then((res) => {
              setCollectionId(null)
              refresh()
              showNotificationSuccess('Added collection to role condition')
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
  )
}
