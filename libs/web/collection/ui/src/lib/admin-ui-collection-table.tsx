import { ActionIcon, Anchor, Badge, Button, Code, Group, ScrollArea, Stack, Text } from '@mantine/core'
import { Collection } from '@pubkey-link/sdk'

import { IconTrash } from '@tabler/icons-react'
import { DataTable } from 'mantine-datatable'
import { useState } from 'react'
import { Link } from 'react-router-dom'

interface AdminCollectionTableProps {
  collections: Collection[]
  deleteCollection: (collection: Collection) => void
  syncCollection: (collection: Collection) => Promise<void>
}

export function AdminUiCollectionTable({
  deleteCollection,
  collections = [],
  syncCollection,
}: AdminCollectionTableProps) {
  const [syncing, setSyncing] = useState<string[]>([])

  const sync = (collection: Collection) => {
    setSyncing((prev) => [...prev, collection.id])
    syncCollection(collection)
      .then(() => {
        setSyncing((prev) => prev.filter((id) => id !== collection.id))
      })
      .catch(() => {
        setSyncing((prev) => prev.filter((id) => id !== collection.id))
      })
  }

  return (
    <ScrollArea>
      <DataTable
        borderRadius="sm"
        withBorder
        shadow="xs"
        columns={[
          {
            accessor: 'collection',
            render: (item) => (
              <Stack spacing={4}>
                <Anchor component={Link} to={`${item.id}`}>
                  {item.name}
                </Anchor>
                <Group>
                  <Code>{item.account}</Code>
                </Group>
              </Stack>
            ),
          },
          {
            accessor: 'assetCount',
            render: (item) => (
              <Stack>
                <Text>{item.assetCount} assets</Text>
              </Stack>
            ),
          },
          {
            accessor: 'actions',
            title: 'Actions',
            textAlignment: 'right',
            render: (item) => (
              <Group spacing="xs" position="right" noWrap>
                <Badge color="brand">{item.network}</Badge>
                <Button size="xs" variant="outline" onClick={() => sync(item)} loading={syncing.includes(item.id)}>
                  Sync
                </Button>
                <ActionIcon color="red" onClick={() => deleteCollection(item)}>
                  <IconTrash size={16} />
                </ActionIcon>
              </Group>
            ),
          },
        ]}
        records={collections}
      />
    </ScrollArea>
  )
}
