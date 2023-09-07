import { AssetAttribute, Prisma } from '@prisma/client'
import { parseAttributes } from '@pubkey-link/api/asset/util'
import { UserFindManyAssetInput } from '../dto/user-find-many-asset.input'

export function getUserAssetWhereInput(userId: string, input: UserFindManyAssetInput): Prisma.AssetWhereInput {
  const where: Prisma.AssetWhereInput = {
    identity: {
      owner: { is: { id: input.ownerId ? input.ownerId : userId } },
    },
  }

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

  if (input.attributes) {
    where.AND = parseAttributes(input.attributes as AssetAttribute[])
  }

  return where
}
