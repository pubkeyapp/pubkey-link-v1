import { Button } from '@mantine/core'
import { modals } from '@mantine/modals'
import { useAdminCollectionCombo } from '@pubkey-link/web/collection/data-access'
import { AssetAttributeInputCreateForm } from './admin-ui-asset-attribute-create-form'

export function AdminUiAssetAttributeCreateModal({
  collectionComboId,
  refresh,
}: {
  collectionComboId: string
  refresh: () => void
}) {
  const { addAttribute } = useAdminCollectionCombo({ collectionComboId })
  return (
    <Button
      variant="light"
      size="xs"
      onClick={() => {
        modals.open({
          title: 'Add Combo',
          children: (
            <AssetAttributeInputCreateForm
              submit={(data) => {
                return addAttribute(data).then((res) => {
                  modals.closeAll()
                  refresh()
                  return true
                })
              }}
            />
          ),
        })
      }}
    >
      Add Attribute
    </Button>
  )
}
