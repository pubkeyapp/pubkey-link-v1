import { UiAdminPage, UiBack, UiError, UiLoader, UiStack, UiTabRoutes } from '@pubkey-link/web/ui/core'
import { useAdminFindOneUser } from '@pubkey-link/web/user/data-access'
import { useParams } from 'react-router-dom'
import { WebAdminUserDetailEmailsTab } from './web-admin-user-detail-emails.tab'
import { WebAdminUserDetailIdentitiesTab } from './web-admin-user-detail-identities.tab'
import { WebAdminUserDetailSettingsTab } from './web-admin-user-detail-settings.tab'

export function WebAdminUserDetailFeature() {
  const { userId } = useParams<{ userId: string }>() as { userId: string }
  const { query, user } = useAdminFindOneUser({ userId })

  return (
    <UiAdminPage leftAction={<UiBack />} title={user?.username ?? '...'}>
      <UiStack>
        {query.isLoading ? (
          <UiLoader />
        ) : user ? (
          <UiTabRoutes
            tabs={[
              {
                value: 'settings',
                label: 'Settings',
                component: <WebAdminUserDetailSettingsTab userId={userId} />,
              },
              {
                value: 'emails',
                label: 'Emails',
                component: <WebAdminUserDetailEmailsTab userId={userId} />,
              },
              {
                value: 'identities',
                label: 'Identities',
                component: <WebAdminUserDetailIdentitiesTab userId={userId} />,
              },
            ]}
          />
        ) : (
          <UiError message="User not found" />
        )}
      </UiStack>
    </UiAdminPage>
  )
}
