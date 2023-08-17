import { Avatar, Divider, Group, Text } from '@mantine/core'
import { DiscordRole } from '@pubkey-link/sdk'
import { AssetAttributeX } from '@pubkey-link/web/asset/ui'
import { UiAlert, UiGroup, UiStack } from '@pubkey-link/web/ui/core'
import { DiscordUiRoleAddCombo } from './discord-ui-role-add-combo'
import { DiscordUiRoleDeleteCollection } from './discord-ui-role-delete-collection'
import { DiscordUiRoleDeleteCombo } from './discord-ui-role-delete-combo'
import { DiscordUiRoleDeleteCondition } from './discord-ui-role-delete-condition'

import { DiscordUiRoleAddCollection } from './discord-ui-role-add-collection'

export function DiscordUiRoleListConditions({ role, refresh }: { role: DiscordRole; refresh: () => void }) {
  return role.conditions?.length ? (
    <UiStack>
      {role.conditions?.map((condition, index) => (
        <UiStack key={condition.id}>
          <Divider />
          <UiGroup align="start">
            <Group align="start" sx={{ flexGrow: 1 }}>
              <Avatar color={'brand'} radius="xl">
                {index + 1}
              </Avatar>
              <UiStack sx={{ flexGrow: 1 }}>
                {condition.collections?.length ? (
                  <UiStack>
                    <Text size="lg">
                      Required {condition.collectionsAmount} of {condition.collections?.length} collection
                      {condition.collections?.length !== 1 ? 's' : ''}
                      {condition.combos?.length
                        ? `
                      and ${condition.combosAmount} of ${condition.combos?.length} combo${
                            condition.combos?.length !== 1 ? 's' : ''
                          } `
                        : null}
                      .
                    </Text>

                    {condition.collections?.length
                      ? condition.collections.map((coll) => (
                          <UiStack key={coll.id}>
                            <Group>
                              <DiscordUiRoleDeleteCollection
                                collection={coll}
                                condition={condition}
                                refresh={refresh}
                              />
                              <Text size="md" fw={600}>
                                {coll.name}
                              </Text>
                            </Group>

                            {coll.combos?.length ? (
                              <UiStack px="xl">
                                {condition.combos?.length ? (
                                  <UiStack>
                                    {condition.combos?.map((combo) => (
                                      <UiStack key={combo.id}>
                                        <Group>
                                          <DiscordUiRoleDeleteCombo
                                            condition={condition}
                                            combo={combo}
                                            refresh={refresh}
                                          />
                                          <Text size={'sm'} fw={600}>
                                            {combo.name}{' '}
                                          </Text>
                                        </Group>
                                        <Group pl="xl" ml="xs">
                                          <AssetAttributeX attributes={combo.attributes ?? []} />
                                        </Group>
                                      </UiStack>
                                    ))}
                                  </UiStack>
                                ) : null}
                                <DiscordUiRoleAddCombo
                                  condition={condition}
                                  combos={coll.combos ?? []}
                                  refresh={refresh}
                                />
                              </UiStack>
                            ) : null}
                          </UiStack>
                        ))
                      : null}
                    <DiscordUiRoleAddCollection condition={condition} refresh={refresh} />
                  </UiStack>
                ) : (
                  <DiscordUiRoleAddCollection condition={condition} refresh={refresh} />
                )}
              </UiStack>
            </Group>
            <Group>
              <DiscordUiRoleDeleteCondition condition={condition} refresh={refresh} />
            </Group>
          </UiGroup>
        </UiStack>
      ))}
      <Divider />
    </UiStack>
  ) : (
    <UiAlert message={'No conditions'} />
  )
}
