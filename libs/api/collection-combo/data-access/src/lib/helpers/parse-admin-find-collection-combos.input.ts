import { Prisma } from '@prisma/client'
import { AdminFindCollectionCombosInput } from '../dto/admin-find-collection-combos.input'

export interface AdminFindCollectionsParsedInput {
  orderBy: Prisma.CollectionComboOrderByWithRelationInput
  skip?: number
  take?: number
  where: Prisma.CollectionComboWhereInput
  include: Prisma.CollectionComboInclude
}

export function parseAdminFindCollectionCombosInput(
  input: AdminFindCollectionCombosInput,
): AdminFindCollectionsParsedInput {
  return {
    where: getAdminFindCollectionCombosWhere(input),
    skip: input.skip ?? 0,
    take: input.take ?? 10,
    orderBy: { updatedAt: 'desc' },
    include: { attributes: true },
  }
}

function getAdminFindCollectionCombosWhere(input: AdminFindCollectionCombosInput): Prisma.CollectionComboWhereInput {
  const where: Prisma.CollectionComboWhereInput = {
    collection: { id: input.collectionId },
  }

  if (input.search) {
    where.OR = [
      { id: { contains: input.search, mode: 'insensitive' } },
      { name: { contains: input.search, mode: 'insensitive' } },
      { description: { contains: input.search, mode: 'insensitive' } },
    ]
  }

  if (input.network) {
    where.network = input.network
  }

  return where
}
