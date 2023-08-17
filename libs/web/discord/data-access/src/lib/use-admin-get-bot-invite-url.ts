import { useWebSdk } from '@pubkey-link/web/shell/data-access'
import { useQuery } from '@tanstack/react-query'

export function useAdminGetBotInviteUrl() {
  const sdk = useWebSdk()
  return useQuery({
    queryKey: ['admin', 'get-bot-invite-url'],
    queryFn: () => sdk.adminGetBotInviteUrl().then((res) => res.data),
  })
}
