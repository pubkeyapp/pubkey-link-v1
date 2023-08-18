import { AssetAttribute, Collection, CollectionCombo, DiscordRole, DiscordRoleCondition } from '@prisma/client'

export type ComboWithAttributes = CollectionCombo & { attributes: AssetAttribute[] }
export type FilteredRoleCondition = DiscordRoleCondition & {
  combos?: ComboWithAttributes[]
  collections?: Collection[]
}
export type FilteredRole = DiscordRole & { conditions?: FilteredRoleCondition[] }
