import { FilteredRole } from '../entity/filtered-role-types'

export function getRoleMap(roles: FilteredRole[]) {
  return roles.reduce((acc, curr) => {
    acc[curr.id] = curr.name
    return acc
  }, {} as Record<string, string>)
}
