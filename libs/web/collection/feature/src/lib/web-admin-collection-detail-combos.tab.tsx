import { Group } from '@mantine/core'
import { Collection } from '@pubkey-link/sdk'
import { useAdminCollectionCombos } from '@pubkey-link/web/collection/data-access'
import { AdminUiCollectionComboCreateModal, AdminUiCollectionComboTable } from '@pubkey-link/web/collection/ui'
import { UiAlert, UiLoader, UiStack } from '@pubkey-link/web/ui/core'

export function WebAdminCollectionDetailCombosTab({ collection }: { collection: Collection }) {
  const { query, deleteCollectionCombo, removeAttribute } = useAdminCollectionCombos({ collectionId: collection.id })
  return query.isLoading ? (
    <UiLoader />
  ) : query.data?.items?.length ? (
    <UiStack>
      <AdminUiCollectionComboTable
        refresh={() => query.refetch()}
        items={query?.data?.items ?? []}
        deleteCollectionCombo={(item) => deleteCollectionCombo(item.id).then((res) => query.refetch())}
        removeAssetAttribute={(collectionComboId, assetAttributeId) =>
          removeAttribute(collectionComboId, assetAttributeId).then((res) => query.refetch())
        }
      />
      <Group position="right">
        <AdminUiCollectionComboCreateModal collectionId={collection.id} />
      </Group>
    </UiStack>
  ) : (
    <UiAlert message="No collection combos." />
  )
}
