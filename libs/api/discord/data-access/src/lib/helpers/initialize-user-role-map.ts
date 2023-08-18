import { GuildMember } from 'discord.js'
import { UserRoleMap } from '../entity/user-role-types'

export function initializeUserRoleMap(members: GuildMember[], managedRoleIds: string[]): UserRoleMap {
  return members.reduce((acc, curr) => {
    acc[curr.id] = {
      has: curr.roles.cache.map((r) => r.id).filter((id) => managedRoleIds.includes(id)),
      needs: [],
    }
    return acc
  }, {} as UserRoleMap)
}
