import { Button } from '@mantine/core'
import { modals } from '@mantine/modals'
import { useAdminCollectionCombos } from '@pubkey-link/web/collection/data-access'
import { AdminUiCollectionComboCreateForm } from './admin-ui-collection-combo-create-form'

export function AdminUiCollectionComboCreateModal({ collectionId }: { collectionId: string }) {
  const { query, createCollectionCombo } = useAdminCollectionCombos({ collectionId })
  return (
    <Button
      onClick={() => {
        modals.open({
          title: 'Add Combo',
          children: (
            <AdminUiCollectionComboCreateForm
              submit={(data) => {
                return createCollectionCombo(data).then((res) => {
                  modals.closeAll()
                  query.refetch()
                  return true
                })
              }}
            />
          ),
        })
      }}
    >
      Add Combo
    </Button>
  )
}
