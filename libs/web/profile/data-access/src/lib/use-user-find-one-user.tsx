import { useWebSdk } from '@pubkey-link/web/shell/data-access'
import { useQuery } from '@tanstack/react-query'

export function useUserFindOneUser(username: string) {
  const sdk = useWebSdk()
  const query = useQuery({
    queryKey: ['user', 'users', 'get', username],
    queryFn: () => sdk.userFindOneUser({ username }).then((res) => res.data),
    retry: 0,
  })

  return {
    user: query.data?.item,
    query,
  }
}
