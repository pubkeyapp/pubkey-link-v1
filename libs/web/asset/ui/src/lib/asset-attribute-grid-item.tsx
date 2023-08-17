import { Button } from '@mantine/core'
import { MantineSize } from '@mantine/styles'
import { AssetAttribute } from '@pubkey-link/sdk'
import React from 'react'

export function AssetAttributeGridItem({
  withLabel,
  attribute,
  size,
  selected,
  toggleTrait,
}: {
  withLabel?: boolean
  size: MantineSize
  attribute: AssetAttribute
  selected?: boolean
  toggleTrait?: (attribute: AssetAttribute) => void
}) {
  return (
    <Button
      sx={{ cursor: 'pointer' }}
      component={'button'}
      onClick={() => (toggleTrait ? toggleTrait(attribute) : null)}
      variant={selected ? 'light' : 'outline'}
      size={size ?? 'sm'}
      radius="sm"
    >
      {withLabel ? `${attribute.key}: ` : null}
      {attribute.value} {attribute.count ? `(${attribute.count})` : null}
    </Button>
  )
}
