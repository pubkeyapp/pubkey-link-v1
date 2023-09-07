import { UiAlert, UiCard } from '@pubkey-link/web/ui/core'
import { useAdminFindOneUser } from '@pubkey-link/web/user/data-access'
import { AdminUiUpdateUserForm } from '@pubkey-link/web/user/ui'

export function WebAdminUserDetailSettingsTab({ userId }: { userId: string }) {
  const { user, updateUser } = useAdminFindOneUser({ userId })

  return (
    <UiCard>
      {user ? <AdminUiUpdateUserForm user={user} submit={updateUser} /> : <UiAlert message="User not found." />}
    </UiCard>
  )
}
