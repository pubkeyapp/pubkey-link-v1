import { NetworkType } from '@pubkey-link/sdk'
import { useUserCollections } from '@pubkey-link/web/collection/data-access'
import { WebProfileUiAssetAttributes, WebProfileUiAssets } from '@pubkey-link/web/profile/ui'
import { UiAlert, UiLoader, UiStack } from '@pubkey-link/web/ui/core'

export function WebCollectionUiDashboard() {
  const { query } = useUserCollections()

  const collections = query.data?.items ?? []

  return query.isLoading ? (
    <UiLoader />
  ) : collections.length ? (
    <UiStack>
      {collections.map((collection) => (
        <UiStack key={collection.id}>
          {/*<UiPageHeader title={collection.name} />*/}
          {collection.combos?.length ? (
            collection.combos?.map(({ name, network, attributes }) => (
              <WebProfileUiAssetAttributes
                key={name}
                attributes={attributes ?? []}
                name={name}
                network={network as NetworkType}
                collectionAccount={collection.account ?? ''}
              />
            ))
          ) : (
            <WebProfileUiAssetAttributes
              name={collection.name}
              network={collection.network as NetworkType}
              collectionAccount={collection.account ?? ''}
            />
          )}
        </UiStack>
      ))}
    </UiStack>
  ) : (
    <UiAlert message={'No collections found'} />
  )
}
