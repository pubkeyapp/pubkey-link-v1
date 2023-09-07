import { Button, Group } from '@mantine/core'
import { modals } from '@mantine/modals'
import { useAdminFindManyIdentity } from '@pubkey-link/web/identity/data-access'
import { AuthUiIdentityCreateForm, IdentityUiAdminTable } from '@pubkey-link/web/identity/ui'
import { UiAlert, UiLoader, UiStack } from '@pubkey-link/web/ui/core'

export function WebAdminUserDetailIdentitiesTab({ userId }: { userId: string }) {
  const { items, createIdentity, deleteIdentity, query } = useAdminFindManyIdentity({ ownerId: userId })

  if (query.isLoading) return <UiLoader />

  return (
    <UiStack>
      {items?.length ? (
        <IdentityUiAdminTable identities={items} deleteIdentity={deleteIdentity} />
      ) : (
        <UiAlert message="No identities found" />
      )}
      <Group position="right">
        <Button
          onClick={() => {
            modals.open({
              title: 'Add Identity',
              children: <AuthUiIdentityCreateForm submit={createIdentity} />,
            })
          }}
        >
          Add Identity
        </Button>
      </Group>
    </UiStack>
  )
}
