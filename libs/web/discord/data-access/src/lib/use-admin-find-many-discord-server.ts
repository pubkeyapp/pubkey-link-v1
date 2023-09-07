import { AdminFindManyDiscordServerInput } from '@pubkey-link/sdk'
import { useWebSdk } from '@pubkey-link/web/shell/data-access'
import { useQuery } from '@tanstack/react-query'

export function useAdminFindManyDiscordServer({ input }: { input: AdminFindManyDiscordServerInput }) {
  const sdk = useWebSdk()
  const query = useQuery({
    queryKey: ['admin', 'discord-servers', 'find', { input }],
    queryFn: () => sdk.adminFindManyDiscordServer({ input }).then((res) => res.data),
  })
  const items = query.data?.paging.data ?? []
  const serverOptions = items.map((server) => ({
    label: `${server.name}`,
    value: `${server.id}`,
  }))

  return {
    items,
    serverOptions,
    query,
  }
}
