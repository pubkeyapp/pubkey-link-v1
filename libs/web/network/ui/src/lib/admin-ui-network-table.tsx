import { ActionIcon, Anchor, Group, ScrollArea, Text } from '@mantine/core'
import { Network } from '@pubkey-link/sdk'

import { IconTrash } from '@tabler/icons-react'
import { DataTable } from 'mantine-datatable'
import { Link } from 'react-router-dom'

interface AdminNetworkTableProps {
  networks: Network[]
  deleteNetwork: (network: Network) => void
}

export function AdminUiNetworkTable({ deleteNetwork, networks = [] }: AdminNetworkTableProps) {
  return (
    <ScrollArea>
      <DataTable
        borderRadius="sm"
        withBorder
        shadow="xs"
        columns={[
          {
            accessor: 'network',
            render: (item) => (
              <Anchor component={Link} to={`${item.id}`}>
                {item.name}
              </Anchor>
            ),
          },
          {
            accessor: 'type',
            textAlignment: 'center',
            render: (item) => <Text>{item.type}</Text>,
          },
          {
            accessor: 'actions',
            title: 'Actions',
            textAlignment: 'right',
            render: (item) => (
              <Group spacing={0} position="right" noWrap>
                <ActionIcon color="red" onClick={() => deleteNetwork(item)}>
                  <IconTrash size={16} />
                </ActionIcon>
              </Group>
            ),
          },
        ]}
        records={networks}
      />
    </ScrollArea>
  )
}
