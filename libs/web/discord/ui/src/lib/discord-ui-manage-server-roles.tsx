import { Accordion, Group } from '@mantine/core'
import { DiscordRole } from '@pubkey-link/sdk'
import { UiDebugModal, UiStack, UiStatus } from '@pubkey-link/web/ui/core'
import { DiscordUiRoleColor } from './discord-ui-role-color'
import { DiscordUiRoleCreateCondition } from './discord-ui-role-create-condition'
import { DiscordUiRoleDelete } from './discord-ui-role-delete'
import { DiscordUiRoleListConditions } from './discord-ui-role-list-conditions'

export function DiscordUiManageServerRoles({
  createCondition,
  deleteRole,
  refresh,
  roles,
}: {
  createCondition: (roleId: string) => void
  deleteRole: (roleId: string) => void
  refresh: () => void
  roles: DiscordRole[]
}) {
  return (
    <UiStack>
      <Accordion variant="separated" multiple>
        {roles.map((role) => {
          return (
            <Accordion.Item key={role.id} value={`${role.id}`}>
              <Accordion.Control>
                <Group align="center" position="apart">
                  <DiscordUiRoleColor color={role.color ?? 0}>{role.name}</DiscordUiRoleColor>
                  <UiStatus>Conditions: {role.conditions?.length ?? 0}</UiStatus>
                </Group>
              </Accordion.Control>
              <Accordion.Panel>
                <UiStack>
                  <DiscordUiRoleListConditions role={role} refresh={refresh} />
                  <Group position="right">
                    <UiDebugModal data={role} />
                    <DiscordUiRoleDelete
                      deleteRole={() => {
                        if (!window.confirm(`Are you sure you want to delete role ${role.name}?`)) return
                        deleteRole(role.id)
                      }}
                    />
                    <DiscordUiRoleCreateCondition createCondition={() => createCondition(role.id)} />
                  </Group>
                </UiStack>
              </Accordion.Panel>
            </Accordion.Item>
          )
        })}
      </Accordion>
    </UiStack>
  )
}
