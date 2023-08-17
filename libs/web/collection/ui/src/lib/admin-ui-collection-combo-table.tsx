import { ActionIcon, Anchor, Code, Group, ScrollArea, Tooltip } from '@mantine/core'
import { CollectionCombo } from '@pubkey-link/sdk'
import { AdminUiAssetAttributeCreateModal } from '@pubkey-link/web/asset/ui'
import { UiStack } from '@pubkey-link/web/ui/core'

import { IconTrash } from '@tabler/icons-react'
import { DataTable } from 'mantine-datatable'
import { Link } from 'react-router-dom'

interface AdminCollectionComboTableProps {
  items: CollectionCombo[]
  deleteCollectionCombo: (item: CollectionCombo) => void
  removeAssetAttribute: (collectionComboId: string, assetAttributeId: string) => void
  refresh: () => void
}

export function AdminUiCollectionComboTable({
  deleteCollectionCombo,
  removeAssetAttribute,
  items = [],
  refresh,
}: AdminCollectionComboTableProps) {
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
              <Anchor component={Link} to={`${item.id}`}>
                {item.name}
              </Anchor>
            ),
          },
          {
            accessor: 'attributes',
            render: (item) =>
              item.attributes ? (
                <UiStack>
                  <AdminUiAssetAttributeCreateModal collectionComboId={item.id} refresh={refresh} />
                  {item.attributes.map((attr) => (
                    <Group position="apart" key={`${attr.key}-${attr.value}`}>
                      <Code>{attr.key}</Code>
                      <Group>
                        <Code>{attr.value}</Code>
                        <Tooltip label={'Delete attribute from combo'} position="left" withArrow>
                          <ActionIcon color="red" onClick={() => removeAssetAttribute(item.id, attr.id as string)}>
                            <IconTrash size={16} />
                          </ActionIcon>
                        </Tooltip>
                      </Group>
                    </Group>
                  ))}
                </UiStack>
              ) : (
                <div>None</div>
              ),
          },
          {
            accessor: 'actions',
            title: 'Actions',
            textAlignment: 'right',
            render: (item) => (
              <Group spacing={0} position="right" noWrap>
                <ActionIcon color="red" onClick={() => deleteCollectionCombo(item)}>
                  <IconTrash size={16} />
                </ActionIcon>
              </Group>
            ),
          },
        ]}
        records={items}
      />
    </ScrollArea>
  )
}
