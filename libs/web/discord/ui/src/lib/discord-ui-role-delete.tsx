import { Button, Tooltip } from '@mantine/core'

export function DiscordUiRoleDelete({ deleteRole }: { deleteRole: () => void }) {
  return (
    <Tooltip label="Delete role from server">
      <Button size="xs" variant="light" color="red" onClick={deleteRole}>
        Delete Role
      </Button>
    </Tooltip>
  )
}
