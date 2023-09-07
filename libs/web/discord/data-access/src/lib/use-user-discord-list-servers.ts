import { useWebSdk } from '@pubkey-link/web/shell/data-access'
import { useQuery } from '@tanstack/react-query'

export function useUserDiscordListServers() {
  const sdk = useWebSdk()
  return useQuery({
    queryKey: ['user', 'find-many-discord-servers'],
    queryFn: () => sdk.userFindManyDiscordServer().then((res) => res.data),
  })
}
