import { UserUpdateUserInput } from '@pubkey-link/sdk'
import { useWebAuth } from '@pubkey-link/web/auth/data-access'
import { useUserProfile } from '@pubkey-link/web/profile/data-access'
import { useWebSdk } from '@pubkey-link/web/shell/data-access'
import { showNotificationError } from '@pubkey-link/web/ui/notifications'

export function useUserSettings() {
  const sdk = useWebSdk()
  const { user } = useWebAuth()
  const { query } = useUserProfile(user?.username as string)

  return {
    user: query.data?.item,
    query,
    updateUser: async (input: UserUpdateUserInput) => {
      return sdk
        .userUpdateUser({
          input,
        })
        .then(async (res) => {
          await query.refetch()
          return !!res.data
        })
        .catch((err) => {
          showNotificationError(err.message)
          return false
        })
    },
  }
}
