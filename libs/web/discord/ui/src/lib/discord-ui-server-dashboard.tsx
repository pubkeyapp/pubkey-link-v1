import { useUserDiscordListServers } from '@pubkey-link/web/discord/data-access'
import { UiLoader, UiPageHeader, UiStack, UiWarn } from '@pubkey-link/web/ui/core'
import { DiscordUiServerGrid } from './discord-ui-server-grid'

export function DiscordUiServerDashboard() {
  const query = useUserDiscordListServers()

  return (
    <UiStack>
      <UiPageHeader title="Discord Servers" />
      {query.isLoading ? (
        <UiLoader />
      ) : query.data?.items?.length ? (
        <DiscordUiServerGrid items={query.data?.items ?? []} />
      ) : (
        <UiWarn message={'No servers found'} />
      )}
    </UiStack>
  )
}
