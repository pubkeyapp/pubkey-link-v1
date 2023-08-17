import { Alert, Group, Text } from '@mantine/core'
import { AssetAttribute, NetworkType } from '@pubkey-link/sdk'
import { useUserAssets } from '@pubkey-link/web/asset/data-access'
import { AssetGrid } from '@pubkey-link/web/asset/ui'
import { UiCard, UiLoader, UiStack, UiStatus, UiWarn } from '@pubkey-link/web/ui/core'

export function WebProfileUiAssetAttributes({
  attributes = [],
  name,
  network,
  collectionAccount,
}: {
  attributes?: AssetAttribute[]
  name: string
  network: NetworkType
  collectionAccount: string
}) {
  const { query, collections } = useUserAssets({ attributes, collectionAccount, network })
  const limit = 36

  return (
    <UiCard>
      <UiStack>
        <Group position={'apart'}>
          <Text size="xl">{name}</Text>
          <UiStatus>
            {query.data?.items?.length} assets in {collections.length} collections
          </UiStatus>
        </Group>

        {query.isLoading ? (
          <UiLoader />
        ) : query.data?.items?.length ? (
          <UiStack>
            {collections.map(({ collection, assets }) => (
              <UiStack key={collection.id}>
                <AssetGrid items={assets.length > limit ? assets.slice(0, limit) : assets} />
                {assets.length > limit && (
                  <Alert ta="center">
                    Showing {limit} of {assets.length} assets
                  </Alert>
                )}
              </UiStack>
            ))}
          </UiStack>
        ) : (
          <UiWarn message="No assets found" />
        )}
      </UiStack>
    </UiCard>
  )
}
