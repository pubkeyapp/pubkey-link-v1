import { AdminReportDiscordMemberWalletsInput } from '@pubkey-link/sdk'
import { useWebSdk } from '@pubkey-link/web/shell/data-access'
import { useQuery } from '@tanstack/react-query'

export function useAdminReportDiscordMemberWallets(input: AdminReportDiscordMemberWalletsInput) {
  const sdk = useWebSdk()
  const query = useQuery({
    queryKey: ['admin', 'report-discord-member-wallets', input],
    queryFn: () => sdk.adminReportDiscordMemberWallets({ input }).then((res) => res.data),
    retry: 0,
  })

  return {
    query,
  }
}
