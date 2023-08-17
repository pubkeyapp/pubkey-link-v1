import { Title, TitleProps } from '@mantine/core'
import { DiscordServer } from '@pubkey-link/sdk'

export interface DiscordUiServerLabelProps extends TitleProps {
  item: DiscordServer
}

export function DiscordUiServerTitle({ item, ...props }: DiscordUiServerLabelProps) {
  return (
    <Title order={2} {...props} color={item.enabled ? undefined : 'dimmed'}>
      {item.name}
    </Title>
  )
}
