import { Prisma } from '@prisma/client'
import { AdminFindDiscordServersInput } from '../dto/admin-find-discord-servers.input'

export interface AdminFindDiscordServerParsedInput {
  orderBy: Prisma.DiscordServerOrderByWithRelationInput
  skip?: number
  take?: number
  where: Prisma.DiscordServerWhereInput
  include: Prisma.DiscordServerInclude
}

export function parseAdminFindDiscordServersInput(
  input: AdminFindDiscordServersInput,
): AdminFindDiscordServerParsedInput {
  return {
    where: getAdminFindDiscordServersWhere(input),
    skip: input.skip ?? 0,
    take: input.take ?? 10,
    orderBy: { name: 'asc' },
    include: { roles: true },
  }
}

function getAdminFindDiscordServersWhere(input: AdminFindDiscordServersInput): Prisma.DiscordServerWhereInput {
  const where: Prisma.DiscordServerWhereInput = {}

  if (input.search) {
    where.OR = [
      { id: { contains: input.search, mode: 'insensitive' } },
      { name: { contains: input.search, mode: 'insensitive' } },
    ]
  }

  return where
}
