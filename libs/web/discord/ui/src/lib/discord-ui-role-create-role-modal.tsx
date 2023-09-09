import { Button, Group } from '@mantine/core'
import { modals } from '@mantine/modals'
import { DiscordServer } from '@pubkey-link/sdk'
import { DiscordUiRoleCreateRole } from './discord-ui-role-create-role'

export function DiscordUiRoleCreateRoleModal({ server }: { server: DiscordServer }) {
  return (
    <Group>
      <Button
        onClick={() => {
          modals.open({
            title: 'Add Role',
            children: <DiscordUiRoleCreateRole server={server} />,
          })
        }}
      >
        Add Role
      </Button>
    </Group>
  )
}
