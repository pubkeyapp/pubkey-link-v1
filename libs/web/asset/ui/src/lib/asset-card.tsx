import { Box, Image } from '@mantine/core'
import { Asset } from '@pubkey-link/sdk'
import { UiStack } from '@pubkey-link/web/ui/core'
import { AssetAttributeGrid } from './asset-attribute-grid'

export function AssetCard({ item }: { item: Asset }) {
  return (
    <UiStack pb="md">
      <Image key={item.id} src={item.image} alt={item.name} />
      <Box px="xs">
        <AssetAttributeGrid attributes={item.attributes ?? []} selected={[]} withLabel />
      </Box>
    </UiStack>
  )
}
