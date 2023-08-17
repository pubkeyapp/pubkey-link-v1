import { Group } from '@mantine/core'
import { Collection } from '@pubkey-link/sdk'
import { useAdminAssets } from '@pubkey-link/web/asset/data-access'
import { AssetGrid } from '@pubkey-link/web/asset/ui'
import { UiAlert, UiLoader, UiPagination, UiSearchField, UiStack } from '@pubkey-link/web/ui/core'

export function WebAdminCollectionDetailAssetsTab({ collection }: { collection: Collection }) {
  const { query, setSearch, pagination } = useAdminAssets({
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
      ) : query.data?.items ? (
        <AssetGrid items={query.data?.items ?? []} />
      ) : (
        <UiAlert message="Assets not found." />
      )}
      <UiPagination pagination={pagination} />
    </UiStack>
  )
}
