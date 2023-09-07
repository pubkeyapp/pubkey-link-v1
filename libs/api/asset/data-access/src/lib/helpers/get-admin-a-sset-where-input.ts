import { Prisma } from '@prisma/client'
import { AdminFindManyAssetInput } from '../dto/admin-find-many-asset.input'

export function getAdminASsetWhereInput(input: AdminFindManyAssetInput): Prisma.AssetWhereInput {
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
