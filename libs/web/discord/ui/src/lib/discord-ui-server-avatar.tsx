import { Avatar, AvatarProps } from '@mantine/core'
import { DiscordServer } from '@pubkey-link/sdk'

export interface DiscordUiServerAvatarProps extends AvatarProps {
  item: DiscordServer
}

export function DiscordUiServerAvatar({ item, ...props }: DiscordUiServerAvatarProps) {
  const sx = item.enabled ? undefined : { filter: 'grayscale(100%)' }

  return <Avatar sx={sx} src={item.iconUrl} size={120} radius="md" {...props} />
}
