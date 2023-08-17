import { Box, Group, Title } from '@mantine/core'
import { DiscordRole } from '@pubkey-link/sdk'
import { UiStack } from '@pubkey-link/web/ui/core'
import { DiscordUiRoleColor } from './discord-ui-role-color'
import { DiscordUiViewRoleConditions } from './discord-ui-view-role-conditions'

export function DiscordUiViewServerRoles({ roles }: { roles: DiscordRole[] }) {
  return (
    <UiStack spacing={32}>
      {roles.map((role) => {
        return (
          <UiStack key={role.id}>
            <Group align="center" position="apart" ml="md">
              <Title order={2}>
                Role <DiscordUiRoleColor color={role.color ?? 0}>{role.name}</DiscordUiRoleColor>
              </Title>
            </Group>
            <Box mx="md">
              <DiscordUiViewRoleConditions role={role} />
            </Box>
          </UiStack>
        )
      })}
    </UiStack>
  )
}
