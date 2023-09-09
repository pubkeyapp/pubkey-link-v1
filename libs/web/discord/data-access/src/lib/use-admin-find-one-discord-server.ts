import { useWebSdk } from '@pubkey-link/web/shell/data-access'
import { showNotificationError, showNotificationSuccess } from '@pubkey-link/web/ui/notifications'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export function useAdminFindOneDiscordServer({ serverId }: { serverId: string }) {
  const sdk = useWebSdk()
  const [syncing, setSyncing] = useState(false)
  const query = useQuery({
    queryKey: ['admin', 'find-one-discord-server', serverId],
    queryFn: () => sdk.adminFindOneDiscordServer({ serverId }).then((res) => res.data),
  })

  return {
    query,
    roles: query.data?.item?.roles ?? [],
    createRole: (name: string) =>
      sdk
        .adminCreateDiscordRole({ input: { name, serverId } })
        .then((res) => {
          showNotificationSuccess('Created role')
          return query.refetch()
        })
        .catch((err) => {
          console.log(err)
          showNotificationError('An error occurred')
        }),
    createCondition: (roleId: string) =>
      sdk
        .adminCreateDiscordRoleCondition({ roleId })
        .then(() => {
          showNotificationSuccess('Added new role condition')
          return query.refetch()
        })
        .catch((err) => {
          console.log(err)
          showNotificationError('An error occurred')
        }),
    deleteRole: (roleId: string) =>
      sdk
        .adminDeleteDiscordRole({ input: { roleId, serverId } })
        .then((res) => {
          showNotificationSuccess('Deleted role')
          return query.refetch()
        })
        .catch((err) => {
          console.log(err)
          showNotificationError('An error occurred')
        }),

    syncing,
    syncRoles: () =>
      sdk
        .adminSyncDiscordRoles({ serverId })
        .then((res) => {
          showNotificationSuccess('Synced roles')
          return query.refetch()
        })
        .catch((err) => {
          console.log(err)
          showNotificationError('An error occurred')
        })
        .finally(() => setSyncing(false)),
  }
}
