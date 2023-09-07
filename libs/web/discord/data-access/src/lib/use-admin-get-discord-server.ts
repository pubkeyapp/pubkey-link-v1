import { useWebSdk } from '@pubkey-link/web/shell/data-access'
import { useQuery } from '@tanstack/react-query'

export function useAdminGetDiscordServer(serverId: string) {
  const sdk = useWebSdk()
  return useQuery({
    queryKey: ['admin', 'find-one-discord-server', serverId],
    queryFn: () => sdk.adminFindOneDiscordServer({ serverId }).then((res) => res.data),
  })
}
