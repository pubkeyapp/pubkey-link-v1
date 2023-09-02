import { Select } from '@mantine/core'
import { DiscordServer } from '@pubkey-link/sdk'
import { useAdminFindDiscordServers } from '@pubkey-link/web/discord/data-access'
import { useAdminReportDiscordMemberWallets } from '@pubkey-link/web/report/data-access'
import { UiAdminPage, UiBack, UiDebug, UiLoader, UiStack } from '@pubkey-link/web/ui/core'
import { useState } from 'react'

export function WebAdminReportIndex() {
  const { serverOptions, servers } = useAdminFindDiscordServers({ input: {} })
  const [server, setServer] = useState<DiscordServer | undefined>(undefined)
  const [report, setReport] = useState<string | undefined>()

  return (
    <UiAdminPage leftAction={<UiBack />} title="Reports">
      <UiStack my="xs" spacing="xl">
        <Select
          data={serverOptions ?? []}
          label="Server"
          placeholder="Select server"
          value={server?.id}
          onChange={(value) => {
            const server = servers.find((server) => server.id === value)
            setServer(server)
          }}
        />
        <Select
          label="Report"
          placeholder="Select report"
          data={[{ value: 'member-wallets', label: 'Member Wallets' }]}
          value={report}
          onChange={(item) => {
            if (!item) return
            setReport(item)
          }}
        />
        {server && report ? <WebAdminReport server={server} report={report} /> : null}
      </UiStack>
    </UiAdminPage>
  )
}

export function WebAdminReport({ server, report }: { server: DiscordServer; report: string }) {
  const { query } = useAdminReportDiscordMemberWallets({ serverId: server.id })

  return (
    <UiStack>
      <UiStack>{query.isLoading ? <UiLoader /> : <UiDebug data={query.data} open />}</UiStack>
    </UiStack>
  )
}
