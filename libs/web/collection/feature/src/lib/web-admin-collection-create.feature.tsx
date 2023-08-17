import { AdminCreateCollectionInput } from '@pubkey-link/sdk'
import { useAdminCollections } from '@pubkey-link/web/collection/data-access'
import { AdminUiCollectionCreateForm } from '@pubkey-link/web/collection/ui'
import { UiBack, UiAdminPage, UiCard } from '@pubkey-link/web/ui/core'
import { showNotificationError } from '@pubkey-link/web/ui/notifications'
import { useNavigate } from 'react-router-dom'

export function WebAdminCollectionCreateFeature() {
  const navigate = useNavigate()
  const { createCollection } = useAdminCollections()

  const submit = async (input: AdminCreateCollectionInput) =>
    createCollection(input)
      .then((res) => navigate(`/admin/collections/${res?.id}`))
      .then(() => true)
      .catch((err) => {
        showNotificationError(err.message)
        return false
      })

  return (
    <UiAdminPage leftAction={<UiBack />} title="Create Collection">
      <UiCard>
        <AdminUiCollectionCreateForm submit={submit} />
      </UiCard>
    </UiAdminPage>
  )
}
