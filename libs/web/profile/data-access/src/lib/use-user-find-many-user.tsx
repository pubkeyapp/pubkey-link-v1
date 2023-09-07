import { UserFindManyUserInput } from '@pubkey-link/sdk'
import { useWebSdk } from '@pubkey-link/web/shell/data-access'
import { useQuery } from '@tanstack/react-query'

export function useUserFindManyUser(input: UserFindManyUserInput) {
  const sdk = useWebSdk()
  const query = useQuery({
    queryKey: ['user', 'users', 'get', input],
    queryFn: () => sdk.userFindManyUser({ input }).then((res) => res.data),
    retry: 0,
  })

  return {
    items: query.data?.paging.data ?? [],
    query,
  }
}
