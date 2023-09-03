import { Select } from '@mantine/core'
import { DiscordServer } from '@pubkey-link/sdk'
import { useAdminCollections } from '@pubkey-link/web/collection/data-access'
import { useAdminFindDiscordServers } from '@pubkey-link/web/discord/data-access'
import { useAdminReportDiscordMemberWallets } from '@pubkey-link/web/report/data-access'
import { UiAdminPage, UiAlert, UiBack, UiDebug, UiLoader, UiStack } from '@pubkey-link/web/ui/core'
import { useState } from 'react'

export function WebAdminReportIndex() {
  const { serverOptions, servers } = useAdminFindDiscordServers({ input: {} })
  const { collectionOptions } = useAdminCollections()
  const [server, setServer] = useState<DiscordServer | undefined>(undefined)
  const [report, setReport] = useState<string | undefined>()
  const [collectionAccount, setCollectionAccount] = useState<string | undefined>()

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
        <Select
          label="Collection"
          placeholder="Select collection"
          data={collectionOptions ?? []}
          value={collectionAccount}
          onChange={(item) => {
            if (!item) return
            setCollectionAccount(item)
          }}
        />
        {server && report && collectionAccount ? (
          <WebAdminReport server={server} report={report} collectionAccount={collectionAccount} />
        ) : null}
      </UiStack>
    </UiAdminPage>
  )
}

export function WebAdminReport({
  server,
  report,
  collectionAccount,
}: {
  server: DiscordServer
  report: string
  collectionAccount: string
}) {
  const { query } = useAdminReportDiscordMemberWallets({ serverId: server.id, collectionAccount })

  return query.isLoading ? (
    <UiLoader />
  ) : query.data?.report ? (
    <UiDebug data={query.data.report} open />
  ) : (
    <UiAlert message="No data found" />
  )
}
