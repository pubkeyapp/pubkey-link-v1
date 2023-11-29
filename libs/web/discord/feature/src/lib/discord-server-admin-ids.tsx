import { ActionIcon, MultiSelect, Tooltip } from '@mantine/core'
import { DiscordServer } from '@pubkey-link/sdk'
import { useAdminFindOneDiscordServer } from '@pubkey-link/web/discord/data-access'
import { useWebSdk } from '@pubkey-link/web/shell/data-access'
import { UiAlert, UiStack } from '@pubkey-link/web/ui/core'
import { showNotificationError, showNotificationSuccess } from '@pubkey-link/web/ui/notifications'
import { IconCheck } from '@tabler/icons-react'
import { useMemo, useState } from 'react'

export function DiscordServerAdminIds({ server, refresh }: { server: DiscordServer; refresh: () => void }) {
  const sdk = useWebSdk()
  const { roles } = useAdminFindOneDiscordServer({
    serverId: server.id,
  })

  const [value, setValue] = useState<string[]>(server.adminIds ?? [])

  const items = useMemo(() => {
    return roles?.length ? roles.map((role) => ({ label: role.name, value: role.id })) : []
  }, [])

  const changed = useMemo(() => {
    return value.sort().join(',') !== server.adminIds?.sort()?.join(',')
  }, [server.adminIds, value])

  return (
    <UiStack>
      {roles?.length ? (
        <UiStack>
          <MultiSelect
            data={items}
            label="Admin Roles"
            description="Select the roles that can manage this server"
            nothingFound="Nothing found"
            placeholder="Select roles to assign"
            searchable
            value={value}
            onChange={setValue}
            rightSection={
              <Tooltip label={changed ? 'Save changes' : 'No changes'} position="left">
                <ActionIcon
                  disabled={!changed}
                  variant={'filled'}
                  color={changed ? 'green' : 'gray'}
                  onClick={async () => {
                    return sdk
                      .adminUpdateDiscordServer({
                        serverId: server.id,
                        input: { adminIds: value },
                      })
                      .then(() => {
                        showNotificationSuccess('Updated')
                        refresh()
                        return true
                      })
                      .catch((err) => {
                        console.error(err)
                        showNotificationError('An error occurred')
                        return false
                      })
                  }}
                >
                  <IconCheck />
                </ActionIcon>
              </Tooltip>
            }
          />
        </UiStack>
      ) : (
        <UiAlert message="Server has no roles" />
      )}
    </UiStack>
  )
}
