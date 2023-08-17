import { AdminFindDiscordServersInput } from '@pubkey-link/sdk'
import { useWebSdk } from '@pubkey-link/web/shell/data-access'
import { useQuery } from '@tanstack/react-query'

export function useAdminFindDiscordServers({ input }: { input: AdminFindDiscordServersInput }) {
  const sdk = useWebSdk()
  return useQuery({
    queryKey: ['admin', 'discord-servers', 'find', { input }],
    queryFn: () => sdk.adminFindDiscordServers({ input }).then((res) => res.data),
  })
}
