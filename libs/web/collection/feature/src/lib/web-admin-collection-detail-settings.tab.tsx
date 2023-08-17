import { useAdminCollection } from '@pubkey-link/web/collection/data-access'
import { AuthUiCollectionUpdateForm } from '@pubkey-link/web/collection/ui'
import { UiAlert, UiCard } from '@pubkey-link/web/ui/core'

export function WebAdminCollectionDetailSettingsTab({ collectionId }: { collectionId: string }) {
  const { collection, updateCollection } = useAdminCollection(collectionId)

  return (
    <UiCard>
      {collection ? (
        <AuthUiCollectionUpdateForm collection={collection} submit={(_, input) => updateCollection(input)} />
      ) : (
        <UiAlert message="Collection not found." />
      )}
    </UiCard>
  )
}
