import { Button, Group } from '@mantine/core'
import { DiscordServer } from '@pubkey-link/sdk'
import { useAdminFindOneDiscordServer } from '@pubkey-link/web/discord/data-access'
import { DiscordUiManageServerRoles, DiscordUiRoleCreateRoleModal } from '@pubkey-link/web/discord/ui'
import { UiAlert, UiLoader, UiPageHeader, UiStack } from '@pubkey-link/web/ui/core'

export function DiscordServerDetailTabRoles({ server }: { server: DiscordServer }) {
  const { syncing, syncRoles, query, roles, createCondition, deleteRole } = useAdminFindOneDiscordServer({
    serverId: server.id,
  })

  return (
    <UiStack>
      {query.isLoading ? (
        <UiLoader />
      ) : (
        <UiStack>
          <UiPageHeader
            title="Roles"
            actions={
              <Group position="right">
                <DiscordUiRoleCreateRoleModal server={server} />
                <Button disabled={!server?.enabled} loading={syncing} onClick={() => syncRoles()}>
                  Sync Roles
                </Button>
              </Group>
            }
          />
          {roles?.length ? (
            <DiscordUiManageServerRoles
              roles={roles}
              refresh={() => query.refetch()}
              createCondition={createCondition}
              deleteRole={deleteRole}
            />
          ) : (
            <UiAlert message="Server has no roles" />
          )}
        </UiStack>
      )}
    </UiStack>
  )
}
