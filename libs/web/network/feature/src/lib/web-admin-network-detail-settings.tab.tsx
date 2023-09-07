import { useAdminFindOneNetwork } from '@pubkey-link/web/network/data-access'
import { AuthUiNetworkUpdateForm } from '@pubkey-link/web/network/ui'
import { UiAlert, UiCard } from '@pubkey-link/web/ui/core'

export function WebAdminNetworkDetailSettingsTab({ networkId }: { networkId: string }) {
  const { network, updateNetwork } = useAdminFindOneNetwork({ networkId })

  return (
    <UiCard>
      {network ? (
        <AuthUiNetworkUpdateForm network={network} submit={(_, input) => updateNetwork(input)} />
      ) : (
        <UiAlert message="Network not found." />
      )}
    </UiCard>
  )
}
