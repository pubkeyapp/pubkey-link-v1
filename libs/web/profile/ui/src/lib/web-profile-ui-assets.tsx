import { Group, Text } from '@mantine/core'
import { NetworkType } from '@pubkey-link/sdk'
import { useUserAssets } from '@pubkey-link/web/asset/data-access'
import { AssetGrid } from '@pubkey-link/web/asset/ui'
import { UiCard, UiLoader, UiStack, UiStatus, UiWarn } from '@pubkey-link/web/ui/core'

export function WebProfileUiAssets({
  name,
  collectionAccount,
  network,
}: {
  name: string
  network: NetworkType
  collectionAccount: string
}) {
  const { query, collections } = useUserAssets({ network, collectionAccount })

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
                <AssetGrid items={assets} />
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
