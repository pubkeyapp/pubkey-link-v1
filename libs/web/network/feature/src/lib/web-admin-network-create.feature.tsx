import { AdminCreateNetworkInput } from '@pubkey-link/sdk'
import { useAdminFindManyNetwork } from '@pubkey-link/web/network/data-access'
import { AdminUiNetworkCreateForm } from '@pubkey-link/web/network/ui'
import { UiBack, UiAdminPage, UiCard } from '@pubkey-link/web/ui/core'
import { showNotificationError } from '@pubkey-link/web/ui/notifications'
import { useNavigate } from 'react-router-dom'

export function WebAdminNetworkCreateFeature() {
  const navigate = useNavigate()
  const { createNetwork } = useAdminFindManyNetwork()

  const submit = async (input: AdminCreateNetworkInput) =>
    createNetwork(input)
      .then((res) => navigate(`/admin/networks/${res?.id}`))
      .then(() => true)
      .catch((err) => {
        showNotificationError(err.message)
        return false
      })

  return (
    <UiAdminPage leftAction={<UiBack />} title="Create Network">
      <UiCard>
        <AdminUiNetworkCreateForm submit={submit} />
      </UiCard>
    </UiAdminPage>
  )
}
