import { Prisma } from '@prisma/client'
import { AdminFindManyCollectionInput } from '../dto/admin-find-many-collection-input'

export function getAdminCollectionWhereInput(input: AdminFindManyCollectionInput): Prisma.CollectionWhereInput {
  const where: Prisma.CollectionWhereInput = {}

  if (input.search) {
    where.OR = [
      { id: { contains: input.search, mode: 'insensitive' } },
      { name: { contains: input.search, mode: 'insensitive' } },
      { account: { contains: input.search, mode: 'insensitive' } },
    ]
  }

  if (input.network) {
    where.network = input.network
  }

  return where
}
