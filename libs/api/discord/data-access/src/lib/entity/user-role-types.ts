export type UserRoleMap = { [key: string]: { has: string[]; needs: string[] } }
export type UserRoleChanges = { userId: string; toAdd: string[]; toKeep: string[]; toRemove: string[] }
