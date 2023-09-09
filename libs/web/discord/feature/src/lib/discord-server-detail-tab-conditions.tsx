import { DiscordServer } from '@pubkey-link/sdk'
import { useAdminFindOneDiscordServer } from '@pubkey-link/web/discord/data-access'
import { DiscordUiManageServerRoles, DiscordUiRoleCreateConditionModal } from '@pubkey-link/web/discord/ui'
import { UiAlert, UiLoader, UiPageHeader, UiStack } from '@pubkey-link/web/ui/core'
import { useMemo } from 'react'

export function DiscordServerDetailTabConditions({ server }: { server: DiscordServer }) {
  const { query, roles, deleteRole, createCondition } = useAdminFindOneDiscordServer({ serverId: server.id })

  const items = useMemo(() => roles?.filter((role) => role.conditions?.length), [roles])

  return (
    <UiStack>
      {query.isLoading ? (
        <UiLoader />
      ) : (
        <UiStack>
          <UiPageHeader
            title="Conditions"
            actions={<DiscordUiRoleCreateConditionModal refresh={() => query.refetch()} roles={server.roles ?? []} />}
          />
          {items?.length ? (
            <DiscordUiManageServerRoles
              roles={items}
              refresh={() => query.refetch()}
              createCondition={createCondition}
              deleteRole={deleteRole}
            />
          ) : (
            <UiAlert message="Server has no role conditions" />
          )}
        </UiStack>
      )}
    </UiStack>
  )
}
