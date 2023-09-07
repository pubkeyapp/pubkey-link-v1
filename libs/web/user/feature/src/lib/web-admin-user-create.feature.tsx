import { Button, Group } from '@mantine/core'
import { AdminCreateUserInput } from '@pubkey-link/sdk'
import { UiBack, UiAdminPage, UiCard } from '@pubkey-link/web/ui/core'
import { showNotificationError } from '@pubkey-link/web/ui/notifications'
import { useAdminFindManyUser } from '@pubkey-link/web/user/data-access'
import { AdminUiCreateUserForm } from '@pubkey-link/web/user/ui'
import { useNavigate } from 'react-router-dom'

export function WebAdminUserCreateFeature() {
  const navigate = useNavigate()
  const { createUser } = useAdminFindManyUser()

  const submit = async (input: AdminCreateUserInput) =>
    createUser(input)
      .then((res) => navigate(`/admin/users/${res?.id}`))
      .then(() => true)
      .catch((err) => {
        showNotificationError(err.message)
        return false
      })

  return (
    <UiAdminPage leftAction={<UiBack />} title="Create User">
      <UiCard>
        <AdminUiCreateUserForm submit={submit}>
          <Group position="right">
            <Button type="submit">Create</Button>
          </Group>
        </AdminUiCreateUserForm>
      </UiCard>
    </UiAdminPage>
  )
}
