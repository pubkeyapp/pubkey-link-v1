export interface DiscordGuild {
  id: string
  name: string
  icon: string
  description: string
  owner_id: string
  region: string
  roles: DiscordGuildRole[]
}

export interface DiscordGuildRole {
  id: string
  name: string
  description?: string
  permissions: string
  position: number
  color: number
  hoist: boolean
  managed: boolean
  mentionable: boolean
  icon?: string
  unicode_emoji?: string
  flags: number
  tags?: DiscordGuildRoleTag
}

export interface DiscordGuildRoleTag {
  bot_id: string
}
