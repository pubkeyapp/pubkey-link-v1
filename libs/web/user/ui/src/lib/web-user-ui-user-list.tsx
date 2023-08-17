import { User } from '@pubkey-link/sdk'
import { UiGroup, UiStack } from '@pubkey-link/web/ui/core'
import { WebUserUiUser } from './web-user-ui-user'

export function WebUserUiUserList({ users = [], title }: { users?: User[]; title?: string }) {
  return (
    <UiStack>
      {users?.map((user) => (
        <UiGroup key={user.id}>
          <WebUserUiUser user={user} />
        </UiGroup>
      ))}
    </UiStack>
  )
}
