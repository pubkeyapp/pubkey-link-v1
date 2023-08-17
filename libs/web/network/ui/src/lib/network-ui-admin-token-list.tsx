import { ActionIcon, Anchor, Badge, Group, ScrollArea, Table, Text } from '@mantine/core'
import { NetworkToken } from '@pubkey-link/sdk'
import { IconTrash } from '@tabler/icons-react'

export function NetworkUiAdminTokenList({
  tokens,
  deleteToken,
}: {
  tokens: NetworkToken[]
  deleteToken: (id: string) => void
}) {
  const rows = tokens.map((item) => (
    <tr key={item.name}>
      <td>
        <Group spacing="sm">
          <Text fz="sm" fw={500}>
            {item.name}
          </Text>
        </Group>
      </td>

      <td>
        <Badge>{item.symbol}</Badge>
      </td>
      <td>
        <Anchor component="button" size="sm">
          {item.decimals}
        </Anchor>
      </td>
      <td>
        <Anchor component="button" size="sm">
          {item.address}
        </Anchor>
      </td>
      <td>
        <Group spacing={0} position="right">
          <ActionIcon
            color="red"
            onClick={() => {
              if (!window.confirm(`Are you sure you want to delete ${item.name}?`)) return
              deleteToken(item.id)
            }}
          >
            <IconTrash size="1rem" stroke={1.5} />
          </ActionIcon>
        </Group>
      </td>
    </tr>
  ))

  return (
    <ScrollArea>
      <Table sx={{ minWidth: 800 }} verticalSpacing="sm">
        <thead>
          <tr>
            <th>Name</th>
            <th>Symbol</th>
            <th>Decimals</th>
            <th>Address</th>
            <th />
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  )
}
