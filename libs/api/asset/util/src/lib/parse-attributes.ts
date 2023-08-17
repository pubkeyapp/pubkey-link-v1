import { AssetAttribute, Prisma } from '@prisma/client'

export function parseAttributes(attributes: AssetAttribute[]): Prisma.AssetWhereInput {
  const inputs: Prisma.AssetWhereInput[] = []

  const attributeMap = attributes.reduce((acc, attribute) => {
    const { key, value } = attribute
    if (!acc[key]) {
      acc[key] = []
    }
    acc[key].push(value)
    return acc
  }, {} as Record<string, string[]>)

  const attributeKeys = Object.keys(attributeMap)

  for (const key of attributeKeys) {
    const values = attributeMap[key]
    if (values.length === 1) {
      inputs.push({ attributeMap: { path: [key], equals: values[0] } })
    } else {
      inputs.push({
        OR: values.map((value) => ({ attributeMap: { path: [key], equals: value } })),
      })
    }
  }

  return { AND: inputs }
}
