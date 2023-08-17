import { useWebSdk } from '@pubkey-link/web/shell/data-access'
import { useQuery } from '@tanstack/react-query'

export function useUserDiscordListServers() {
  const sdk = useWebSdk()
  return useQuery({
    queryKey: ['user', 'get', 'discord-servers'],
    queryFn: () => sdk.userGetDiscordServers().then((res) => res.data),
  })
}
export function useAdminGetDiscordServer(serverId: string) {
  const sdk = useWebSdk()
  return useQuery({
    queryKey: ['admin', 'get', 'discord-server', serverId],
    queryFn: () => sdk.adminGetDiscordServer({ serverId }).then((res) => res.data),
  })
}
