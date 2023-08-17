import { Group } from '@mantine/core'
import { DiscordServer } from '@pubkey-link/sdk'
import { useAdminGetDiscordServer } from '@pubkey-link/web/discord/data-access'
import { DiscordUiRoleCreateConditionModal, DiscordUiManageServerRoles } from '@pubkey-link/web/discord/ui'
import { UiAlert, UiLoader, UiStack } from '@pubkey-link/web/ui/core'
import { useMemo } from 'react'

export function DiscordServerDetailTabRoles({ server }: { server: DiscordServer }) {
  const query = useAdminGetDiscordServer(server.id!)
  const items = useMemo(() => {
    return query.data?.item?.roles ?? []
  }, [query.data?.item?.roles])

  return (
    <UiStack>
      {query.isLoading ? (
        <UiLoader />
      ) : (
        <UiStack>
          {items?.length ? (
            <DiscordUiManageServerRoles roles={items ?? []} refresh={() => query.refetch()} />
          ) : (
            <UiAlert message="Server has no roles" />
          )}
          <Group position="right">
            <DiscordUiRoleCreateConditionModal refresh={() => query.refetch()} roles={server.roles ?? []} />
          </Group>
        </UiStack>
      )}
    </UiStack>
  )
}
