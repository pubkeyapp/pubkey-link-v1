import { Button, Tooltip } from '@mantine/core'

export function DiscordUiRoleCreateCondition({ createCondition }: { createCondition: () => void }) {
  return (
    <Tooltip label="Add a new condition for role">
      <Button size="xs" variant="light" onClick={createCondition}>
        Add Condition
      </Button>
    </Tooltip>
  )
}
