import { Group } from '@mantine/core'
import { Collection } from '@pubkey-link/sdk'
import { useAdminFindManyAsset } from '@pubkey-link/web/asset/data-access'
import { AssetGrid } from '@pubkey-link/web/asset/ui'
import { UiAlert, UiLoader, UiPagination, UiSearchField, UiStack } from '@pubkey-link/web/ui/core'

export function WebAdminCollectionDetailAssetsTab({ collection }: { collection: Collection }) {
  const { query, items, setSearch, pagination } = useAdminFindManyAsset({
    network: collection.network,
    collectionAccount: collection.account,
  })

  return (
    <UiStack>
      <Group>
        <UiSearchField placeholder="Search asset" setSearch={setSearch} />
      </Group>

      {query.isLoading ? (
        <UiLoader />
      ) : items ? (
        <AssetGrid items={items ?? []} />
      ) : (
        <UiAlert message="Assets not found." />
      )}
      <UiPagination pagination={pagination} />
    </UiStack>
  )
}
