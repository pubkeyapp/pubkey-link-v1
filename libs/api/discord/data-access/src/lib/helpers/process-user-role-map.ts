import { UserRoleChanges, UserRoleMap } from '../entity/user-role-types'

export function processUserRoleMap(userRoleMap: UserRoleMap): UserRoleChanges[] {
  return (
    Object.entries(userRoleMap)
      // Map the user role map to a list of changes
      .map(([userId, roles]) => {
        const { has, needs } = roles
        return {
          userId,
          toAdd: needs.filter((r) => !has.includes(r)),
          toKeep: has.filter((r) => needs.includes(r)),
          toRemove: has.filter((r) => !needs.includes(r)),
        }
      })
      // Filter out users that don't need any changes
      .filter((item) => item.toAdd.length > 0 || item.toRemove.length > 0)
  )
}
