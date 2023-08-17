import { Prisma } from '@prisma/client'
import { UserFindCollectionsInput } from '../dto/user-find-collections.input'

export interface UserFindCollectionsParsedInput {
  orderBy: Prisma.CollectionOrderByWithRelationInput
  skip?: number
  take?: number
  where: Prisma.CollectionWhereInput
  include?: Prisma.CollectionInclude
}

export function parseUserFindCollectionsInput(input: UserFindCollectionsInput): UserFindCollectionsParsedInput {
  return {
    where: getUserFindCollectionsWhere(input),
    skip: input.skip ?? 0,
    take: input.take ?? 10,
    orderBy: { updatedAt: 'desc' },
    include: { combos: { include: { attributes: true } } },
  }
}

function getUserFindCollectionsWhere(input: UserFindCollectionsInput): Prisma.CollectionWhereInput {
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
