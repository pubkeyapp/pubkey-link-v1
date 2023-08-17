import { Button, Group } from '@mantine/core'
import { useAdminCollection } from '@pubkey-link/web/collection/data-access'
import { UiBack, UiAdminPage, UiDebugModal, UiError, UiLoader, UiStack, UiTabRoutes } from '@pubkey-link/web/ui/core'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { WebAdminCollectionDetailAssetsTab } from './web-admin-collection-detail-assets-tab'
import { WebAdminCollectionDetailCombosTab } from './web-admin-collection-detail-combos.tab'
import { WebAdminCollectionDetailSettingsTab } from './web-admin-collection-detail-settings.tab'

export function WebAdminCollectionDetailFeature() {
  const { collectionId } = useParams<{ collectionId: string }>() as { collectionId: string }
  const { query, collection, syncCollection } = useAdminCollection(collectionId)

  const [loading, setLoading] = useState(false)

  function sync() {
    setLoading(true)
    syncCollection()
      .then(() => setLoading(false))
      .catch(() => setLoading(false))
  }

  return (
    <UiAdminPage
      leftAction={<UiBack />}
      title={collection?.name ?? '...'}
      rightAction={
        <Group>
          <UiDebugModal data={collection} />
          <Button loading={loading} onClick={sync}>
            Synchronize
          </Button>
        </Group>
      }
    >
      <UiStack>
        {query.isLoading ? (
          <UiLoader />
        ) : collection ? (
          <UiTabRoutes
            tabs={[
              {
                value: 'assets',
                label: 'Assets',
                component: <WebAdminCollectionDetailAssetsTab collection={collection} />,
              },
              {
                value: 'combos',
                label: 'Combos',
                component: <WebAdminCollectionDetailCombosTab collection={collection} />,
              },
              {
                value: 'settings',
                label: 'Settings',
                component: <WebAdminCollectionDetailSettingsTab collectionId={collectionId} />,
              },
            ]}
          />
        ) : (
          <UiError message="Collection not found" />
        )}
      </UiStack>
    </UiAdminPage>
  )
}
