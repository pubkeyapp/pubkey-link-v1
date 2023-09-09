import { Button } from '@mantine/core'
import { DiscordServer } from '@pubkey-link/sdk'
import { useAdminFindOneDiscordServer } from '@pubkey-link/web/discord/data-access'
import { formFieldText, UiForm, UiStack } from '@pubkey-link/web/ui/core'

export function DiscordUiRoleCreateRole({ server }: { server: DiscordServer }) {
  const { createRole } = useAdminFindOneDiscordServer({ serverId: server.id })

  return (
    <UiStack>
      <UiForm
        model={{ name: '' }}
        fields={[
          formFieldText('name', {
            label: 'Name',
            required: true,
            description: 'The name of the role',
          }),
        ]}
        submit={({ name }: { name?: string }) => createRole(name ?? 'New Role').then(() => true)}
      >
        <Button size="xs" variant="light" type="submit">
          Create Role
        </Button>
      </UiForm>
    </UiStack>
  )
}
