import { useWebSdk } from '@pubkey-link/web/shell/data-access'
import { useQuery } from '@tanstack/react-query'

export function useAdminReportDiscordMemberWallets({ serverId }: { serverId: string }) {
  const sdk = useWebSdk()
  const query = useQuery(
    ['admin', 'report-discord-member-wallets', serverId],
    () => sdk.adminReportDiscordMemberWallets({ serverId }).then((res) => res.data),
    { retry: 0 },
  )

  return {
    query,
  }
}
