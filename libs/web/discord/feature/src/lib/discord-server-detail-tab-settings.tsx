import { DiscordServer } from '@pubkey-link/sdk'
import { AuthUiDiscordServerUpdateForm } from '@pubkey-link/web/discord/ui'
import { useWebSdk } from '@pubkey-link/web/shell/data-access'
import { UiCard, UiStack } from '@pubkey-link/web/ui/core'
import { showNotificationError, showNotificationSuccess } from '@pubkey-link/web/ui/notifications'

export function DiscordServerDetailTabSettings({ refresh, server }: { server: DiscordServer; refresh: () => void }) {
  const sdk = useWebSdk()

  return (
    <UiStack>
      <UiCard>
        <AuthUiDiscordServerUpdateForm
          item={server}
          submit={(input) =>
            sdk
              .adminUpdateDiscordServer({ serverId: server.id, input })
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
          }
        />
      </UiCard>
    </UiStack>
  )
}
