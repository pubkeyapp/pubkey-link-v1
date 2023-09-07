import { NetworkType } from '@pubkey-link/sdk'
import { useUserFindManyCollection } from '@pubkey-link/web/collection/data-access'
import { WebProfileUiAssetAttributes } from '@pubkey-link/web/profile/ui'
import { UiAlert, UiLoader, UiStack } from '@pubkey-link/web/ui/core'

export function WebCollectionUiDashboard() {
  const { query, items } = useUserFindManyCollection()

  return query.isLoading ? (
    <UiLoader />
  ) : items.length ? (
    <UiStack>
      {items.map((collection) => (
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
