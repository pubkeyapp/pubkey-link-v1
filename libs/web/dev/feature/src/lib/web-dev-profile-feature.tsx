import { Button, Group } from '@mantine/core'
import { User } from '@pubkey-link/sdk'
import {
  UiAlert,
  UiCard,
  UiDebug,
  UiGroup,
  UiLoader,
  UiPagination,
  UiSearchField,
  UiStack,
} from '@pubkey-link/web/ui/core'
import { useAdminUsers } from '@pubkey-link/web/user/data-access'
import { WebUserUiUser } from '@pubkey-link/web/user/ui'
import { useEffect, useMemo, useState } from 'react'

export function WebDevProfileFeature() {
  const { query, pagination, setSearch } = useAdminUsers({ take: 100 })
  const [user, setUser] = useState<User | undefined>(undefined)
  const [userId] = useState<string | undefined>()

  const items = useMemo(() => query.data?.items ?? [], [query.data?.items])

  useEffect(() => {
    if (!userId) return
    const found = items.find((i) => i.id === userId)
    if (found) {
      setUser(found)
    }
  }, [items, userId])

  return (
    <div>
      {query.isLoading ? (
        <UiLoader />
      ) : (
        <UiStack>
          <Group>
            <UiSearchField placeholder="Search user" setSearch={setSearch} />
          </Group>

          {query.isLoading ? (
            <UiLoader />
          ) : items?.length ? (
            <UiCard>
              {items.map((item) => (
                <UiGroup key={item.id}>
                  <WebUserUiUser user={item} />
                  <Button disabled={item.id === user?.id} onClick={() => setUser(item)}>
                    Select
                  </Button>
                </UiGroup>
              ))}
            </UiCard>
          ) : (
            <UiAlert message="User not found" />
          )}

          <UiPagination pagination={pagination} />
          <UiDebug data={{ user, userId, items }} open />
        </UiStack>
      )}
    </div>
  )
}
