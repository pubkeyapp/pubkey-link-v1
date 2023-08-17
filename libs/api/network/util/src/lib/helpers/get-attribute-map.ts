export function getAttributeMap(metadata?: { attributes?: { trait_type: string; value: string }[] }): {
  attributes: { key: string; value: string }[]
  attributeMap: { [key: string]: string }
} {
  const itemAttributes: { key: string; value: string }[] = (metadata?.attributes ?? []).map((item) => ({
    key: item.trait_type,
    value: item.value?.toString(),
  }))
  const attributes = itemAttributes.sort((a, b) => a.key.localeCompare(b.key))
  const attributeMap: { [key: string]: string } = attributes.reduce(
    (acc, cur) => ({
      ...acc,
      [cur.key]: cur.value,
    }),
    {},
  )

  return {
    attributes,
    attributeMap,
  }
}
