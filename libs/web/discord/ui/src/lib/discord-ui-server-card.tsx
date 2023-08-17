import { Paper, Tooltip } from '@mantine/core'
import { DiscordServer } from '@pubkey-link/sdk'
import { DiscordUiServerAvatar } from './discord-ui-server-avatar'
import { DiscordUiServerTitle } from './discord-ui-server-title'

interface DiscordUiServerCardProps {
  item: DiscordServer
}

export function DiscordUiServerCard({ item }: DiscordUiServerCardProps) {
  return (
    <Tooltip label={`Server ${item.name} is ${item.enabled ? 'enabled' : 'disabled'}`} position="bottom">
      <Paper radius="md" withBorder p="lg">
        <DiscordUiServerAvatar item={item} mx="auto" />
        <DiscordUiServerTitle item={item} mt="md" align="center" />
      </Paper>
    </Tooltip>
  )
}
