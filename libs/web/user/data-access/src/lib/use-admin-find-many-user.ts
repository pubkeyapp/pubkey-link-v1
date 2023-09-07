import { AdminCreateUserInput, AdminFindManyUserInput, UserRole, UserStatus } from '@pubkey-link/sdk'
import { useWebSdk } from '@pubkey-link/web/shell/data-access'
import { useUiPagination } from '@pubkey-link/web/ui/core'
import { showNotificationError, showNotificationSuccess } from '@pubkey-link/web/ui/notifications'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export function useAdminFindManyUser(props?: { limit?: number }) {
  const sdk = useWebSdk()
  const [role, setRole] = useState<UserRole | undefined>(undefined)
  const [status, setStatus] = useState<UserStatus | undefined>(undefined)
  const [limit, setLimit] = useState(props?.limit ?? 10)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState<string>('')

  const input: AdminFindManyUserInput = { role, page, status, limit, search }
  const query = useQuery({
    queryKey: ['admin', 'find-many-user', input],
    queryFn: () => sdk.adminFindManyUser({ input }).then((res) => res.data),
  })
  const total = query.data?.paging.meta.totalCount ?? 0

  return {
    items: query.data?.paging.data ?? [],
    createUser: (input: AdminCreateUserInput) =>
      sdk
        .adminCreateUser({ input })
        .then((res) => res.data)
        .then((res) => {
          if (res.created) {
            showNotificationSuccess(`User  created`)
          } else {
            showNotificationError(`User not created`)
          }
          return res.created
        })
        .catch((err) => {
          showNotificationError(err.message)
          return undefined
        }),
    deleteUser: (userId: string) =>
      sdk.adminDeleteUser({ userId }).then(() => {
        showNotificationSuccess('User deleted')
        return query.refetch()
      }),
    query,
    role,
    setRole,
    setSearch,
    setStatus,
    status,
    pagination: useUiPagination({
      page,
      setPage,
      limit,
      setLimit,
      total,
    }),
  }
}
