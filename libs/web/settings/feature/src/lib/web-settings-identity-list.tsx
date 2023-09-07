import { useUserFindManyIdentity } from '@pubkey-link/web/identity/data-access'
import { IdentityUiIdentityGroupList, IdentityUiSolanaLinkButton } from '@pubkey-link/web/identity/ui'
import { UiLoader, UiStack, UiWarn } from '@pubkey-link/web/ui/core'

export function WebSettingsIdentityList() {
  const { deleteIdentity, hasSolana, grouped, items, query } = useUserFindManyIdentity()

  return (
    <UiStack>
      {!hasSolana && <IdentityUiSolanaLinkButton items={items ?? []} refresh={() => query.refetch()} />}
      {query.isLoading ? (
        <UiLoader />
      ) : items.length === 0 ? (
        <UiWarn message="No identities found" />
      ) : (
        <IdentityUiIdentityGroupList
          grouped={grouped}
          deleteIdentity={deleteIdentity}
          refresh={() => query.refetch()}
        />
      )}
    </UiStack>
  )
}
