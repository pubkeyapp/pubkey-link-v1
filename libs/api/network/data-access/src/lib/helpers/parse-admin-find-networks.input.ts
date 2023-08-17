import { Prisma } from '@prisma/client'
import { AdminFindNetworksInput } from '../dto/admin-find-networks.input'

export interface AdminFindNetworksParsedInput {
  orderBy: Prisma.NetworkOrderByWithRelationInput
  skip?: number
  take?: number
  where: Prisma.NetworkWhereInput
}

export function parseAdminFindNetworksInput(input: AdminFindNetworksInput): AdminFindNetworksParsedInput {
  return {
    where: getAdminFindNetworksWhere(input),
    skip: input.skip ?? 0,
    take: input.take ?? 10,
    orderBy: { updatedAt: 'desc' },
  }
}

function getAdminFindNetworksWhere(input: AdminFindNetworksInput): Prisma.NetworkWhereInput {
  const where: Prisma.NetworkWhereInput = {}

  if (input.search) {
    where.OR = [
      { id: { contains: input.search, mode: 'insensitive' } },
      { name: { contains: input.search, mode: 'insensitive' } },
      { endpoint: { contains: input.search, mode: 'insensitive' } },
    ]
  }

  if (input.type) {
    where.type = input.type
  }

  return where
}
