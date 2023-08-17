import { Box, SimpleGrid } from '@mantine/core'
import { Asset } from '@pubkey-link/sdk'
import React from 'react'
import { AssetImage } from './asset-image'

export function AssetGrid({ items }: { items: Asset[] }) {
  return (
    <SimpleGrid
      breakpoints={[
        { maxWidth: 'sm', cols: 3 },
        { minWidth: 'sm', cols: 3 },
        { minWidth: 'md', cols: 3 },
        { minWidth: 1200, cols: 6 },
        { minWidth: 1500, cols: 8 },
        { minWidth: 1800, cols: 10 },
        { minWidth: 2100, cols: 12 },
        { minWidth: 2400, cols: 14 },
        { minWidth: 2700, cols: 18 },
        { minWidth: 3000, cols: 24 },
        { minWidth: 3300, cols: 28 },
      ]}
    >
      {items.map((item) => (
        <Box key={item.id} p={0}>
          <AssetImage item={item} />
        </Box>
      ))}
    </SimpleGrid>
  )
}
