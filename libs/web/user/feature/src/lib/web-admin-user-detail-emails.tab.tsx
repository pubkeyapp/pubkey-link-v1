import { Button, Group } from '@mantine/core'
import { modals } from '@mantine/modals'
import { Email } from '@pubkey-link/sdk'
import { UiAlert, UiLoader, UiStack } from '@pubkey-link/web/ui/core'
import { useAdminEmail } from '@pubkey-link/web/user/data-access'
import { AdminUiEmailTable, AuthUiEmailCreateForm, AuthUiEmailUpdateForm } from '@pubkey-link/web/user/ui'

export function WebAdminUserDetailEmailsTab({ userId }: { userId: string }) {
  const { emails, createEmail, deleteEmail, updateEmail, query } = useAdminEmail({ userId })

  if (query.isLoading) return <UiLoader />

  return (
    <UiStack>
      {emails?.length ? (
        <AdminUiEmailTable
          emails={emails ?? []}
          editEmail={(email: Email) => {
            modals.open({
              title: 'Edit Email',
              children: <AuthUiEmailUpdateForm email={email} submit={updateEmail} />,
            })
          }}
          deleteEmail={(email) => {
            if (!window.confirm(`Delete email ${email.email}?`)) return
            return deleteEmail(email)
          }}
        />
      ) : (
        <UiAlert message="No emails found" />
      )}
      <Group position="right">
        <Button
          onClick={() => {
            modals.open({
              title: 'Add Email',
              children: <AuthUiEmailCreateForm submit={createEmail} />,
            })
          }}
        >
          Add Email
        </Button>
      </Group>
    </UiStack>
  )
}
