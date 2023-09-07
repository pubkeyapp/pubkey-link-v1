import { Prisma } from '@prisma/client'
import { AdminFindManyCollectionComboInput } from '../dto/admin-find-many-collection-combo-input'

export function getAdminFindCollectionComboWhereInput(
  input: AdminFindManyCollectionComboInput,
): Prisma.CollectionComboWhereInput {
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
