import { Button, Group } from '@mantine/core'
import { AdminCreateCollectionInput } from '@pubkey-link/sdk'
import { useAdminFindManyCollection } from '@pubkey-link/web/collection/data-access'
import { AdminUiCollectionCreateForm } from '@pubkey-link/web/collection/ui'
import { UiBack, UiAdminPage, UiCard } from '@pubkey-link/web/ui/core'
import { showNotificationError } from '@pubkey-link/web/ui/notifications'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function WebAdminCollectionCreateFeature() {
  const navigate = useNavigate()
  const { createCollection } = useAdminFindManyCollection()
  const [loading, setLoading] = useState(false)
  const submit = async (input: AdminCreateCollectionInput) => {
    setLoading(true)
    return createCollection(input)
      .then((res) => {
        if (res?.id) {
          navigate(`/admin/collections/${res?.id}`)
        }
        setLoading(false)
      })
      .then(() => true)
      .catch((err) => {
        setLoading(false)
        showNotificationError(err.message)
        return false
      })
  }

  return (
    <UiAdminPage leftAction={<UiBack />} title="Create Collection">
      <UiCard>
        <AdminUiCollectionCreateForm submit={submit}>
          <Group position="right">
            <Button loading={loading} type="submit">
              Create
            </Button>
          </Group>
        </AdminUiCollectionCreateForm>
      </UiCard>
    </UiAdminPage>
  )
}
