import { Prisma } from '@prisma/client'
import { AdminFindAssetsInput } from '../dto/admin-find-assets.input'

export interface AdminFindAssetsParsedInput {
  orderBy: Prisma.AssetOrderByWithRelationInput[]
  skip?: number
  take?: number
  where: Prisma.AssetWhereInput
  include: Prisma.AssetInclude
}

export function parseAdminFindAssetsInput(input: AdminFindAssetsInput): AdminFindAssetsParsedInput {
  return {
    where: getAdminFindAssetsWhere(input),
    skip: input.skip ?? 0,
    take: input.take ?? 10,
    orderBy: [{ identityId: 'asc' }, { name: 'asc' }],
    include: { identity: { include: { owner: true } } },
  }
}

function getAdminFindAssetsWhere(input: AdminFindAssetsInput): Prisma.AssetWhereInput {
  const where: Prisma.AssetWhereInput = {}

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

  if (input.collectionAccount) {
    where.collectionAccount = input.collectionAccount
  }

  return where
}
