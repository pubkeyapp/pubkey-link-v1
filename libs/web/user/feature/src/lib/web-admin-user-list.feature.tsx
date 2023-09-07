import { Button, Group, Select } from '@mantine/core'
import { User, UserRole, UserStatus } from '@pubkey-link/sdk'
import { UiBack, UiAdminPage, UiAlert, UiLoader, UiPagination, UiSearchField } from '@pubkey-link/web/ui/core'
import { useAdminFindManyUser } from '@pubkey-link/web/user/data-access'
import { AdminUiUserTable, userRoleOptions, userStatusOptions } from '@pubkey-link/web/user/ui'
import { Link } from 'react-router-dom'

export function WebAdminUserListFeature() {
  const { deleteUser, pagination, query, items, role, setRole, setSearch, setStatus, status } = useAdminFindManyUser()

  return (
    <UiAdminPage
      title="Users"
      leftAction={<UiBack />}
      rightAction={
        <Button component={Link} to="create">
          Create
        </Button>
      }
    >
      <Group>
        <UiSearchField placeholder="Search user" setSearch={setSearch} />
        <Select
          value={role?.toString() ?? ''}
          onChange={(role) => {
            pagination.setPage(1)
            setRole(role === '' ? undefined : (role as UserRole))
          }}
          data={[{ value: '', label: 'Filter by role' }, ...userRoleOptions()]}
        />
        <Select
          value={status?.toString() ?? ''}
          onChange={(status) => {
            pagination.setPage(1)
            setStatus(status === '' ? undefined : (status as UserStatus))
          }}
          data={[{ value: '', label: 'Filter by status' }, ...userStatusOptions()]}
        />
      </Group>

      {query.isLoading ? (
        <UiLoader />
      ) : items?.length ? (
        <AdminUiUserTable
          deleteUser={(user) => {
            if (!window.confirm('Are you sure?')) return
            return deleteUser(user.id)
          }}
          users={items ?? []}
        />
      ) : (
        <UiAlert message="User not found" />
      )}

      <UiPagination pagination={pagination} />
    </UiAdminPage>
  )
}
