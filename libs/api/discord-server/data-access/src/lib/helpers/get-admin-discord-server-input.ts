import { Prisma } from '@prisma/client'
import { AdminFindManyDiscordServerInput } from '../dto/admin-find-many-discord-server-input'

export function getAdminDiscordServerInput(input: AdminFindManyDiscordServerInput): Prisma.DiscordServerWhereInput {
  const where: Prisma.DiscordServerWhereInput = {}

  if (input.search) {
    where.OR = [
      { id: { contains: input.search, mode: 'insensitive' } },
      { name: { contains: input.search, mode: 'insensitive' } },
    ]
  }

  return where
}
