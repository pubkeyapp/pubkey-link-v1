import { GuildMember } from 'discord.js'

export function getUsernameMap(members: GuildMember[]) {
  return members.reduce((acc, curr) => {
    acc[curr.id] = curr.user.username
    return acc
  }, {} as Record<string, string>)
}
