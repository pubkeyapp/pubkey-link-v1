import { Code, SimpleGrid, SimpleGridProps } from '@mantine/core'
import { MantineSize } from '@mantine/styles'
import { AssetAttribute, sortAssetAttributesByCount } from '@pubkey-link/sdk'
import { UiGroup, UiStack } from '@pubkey-link/web/ui/core'
import React, { ReactNode } from 'react'
import { AssetAttributeGridItem } from './asset-attribute-grid-item'

export interface AssetAttributeGridProps extends SimpleGridProps {
  withLabel?: boolean
  buttonSize?: MantineSize
  attributes: AssetAttribute[]
  selected?: AssetAttribute[]
  label?: ReactNode
}

export function AssetAttributeGrid({
  label,
  withLabel = false,
  attributes,
  buttonSize = 'sm',
  selected,
  ...props
}: AssetAttributeGridProps) {
  return (
    <SimpleGrid {...props} cols={2}>
      {label}
      {sortAssetAttributesByCount(attributes).map((attribute) => (
        <AssetAttributeGridItem
          size={buttonSize}
          withLabel={withLabel}
          attribute={attribute}
          // toggleTrait={toggleTrait}
          selected={selected?.some((s) => s.key === attribute.key && s.value === attribute.value)}
          key={attribute.key + ':' + attribute.value}
        />
      ))}
    </SimpleGrid>
  )
}

export function AssetAttributeX({ attributes }: { attributes: AssetAttribute[] }) {
  return (
    <UiStack>
      {sortAssetAttributesByCount(attributes).map((attribute) => (
        <UiGroup key={`${attribute.key}-${attribute.value}`}>
          <Code>
            {attribute.key}: {attribute.value}
          </Code>
        </UiGroup>
        // <AssetAttributeGridItem
        //   size={buttonSize}
        //   withLabel={withLabel}
        //   attribute={attribute}
        //   // toggleTrait={toggleTrait}
        //   selected={selected?.some((s) => s.key === attribute.key && s.value === attribute.value)}
        //   key={attribute.key + ':' + attribute.value}
        // />
      ))}
    </UiStack>
  )
}
