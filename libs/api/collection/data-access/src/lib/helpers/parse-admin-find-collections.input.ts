import { Prisma } from '@prisma/client'
import { AdminFindCollectionsInput } from '../dto/admin-find-collections.input'

export interface AdminFindCollectionsParsedInput {
  orderBy: Prisma.CollectionOrderByWithRelationInput
  skip?: number
  take?: number
  where: Prisma.CollectionWhereInput
}

export function parseAdminFindCollectionsInput(input: AdminFindCollectionsInput): AdminFindCollectionsParsedInput {
  return {
    where: getAdminFindCollectionsWhere(input),
    skip: input.skip ?? 0,
    take: input.take ?? 10,
    orderBy: { name: 'asc' },
  }
}

function getAdminFindCollectionsWhere(input: AdminFindCollectionsInput): Prisma.CollectionWhereInput {
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
