import { AssetAttribute, Prisma } from '@prisma/client'
import { parseAttributes } from '@pubkey-link/api/asset/util'
import { UserFindAssetsInput } from '../dto/user-find-assets.input'

export interface UserFindAssetsParsedInput {
  orderBy: Prisma.AssetOrderByWithRelationInput
  skip?: number
  take?: number
  where: Prisma.AssetWhereInput
  include?: Prisma.AssetInclude
}

export function parseUserFindAssetsInput(userId: string, input: UserFindAssetsInput): UserFindAssetsParsedInput {
  return {
    where: getUserFindAssetsWhere(userId, input),
    skip: input.skip ?? 0,
    take: input.take ?? 10,
    orderBy: { name: 'asc' },
    include: {
      collection: true,
      identity: { include: { owner: true } },
    },
  }
}

function getUserFindAssetsWhere(userId: string, input: UserFindAssetsInput): Prisma.AssetWhereInput {
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

  where.identity = {
    owner: { is: { id: input.ownerId ? input.ownerId : userId } },
  }

  if (input.attributes) {
    where.AND = parseAttributes(input.attributes as AssetAttribute[])
  }

  return where
}
