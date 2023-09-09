import { Avatar, AvatarProps } from '@mantine/core'
import { Collection } from '@pubkey-link/sdk'

export interface WebUiCollectionAvatarProps extends AvatarProps {
  collection?: Collection
}
export function WebUiCollectionAvatar({ collection, ...props }: WebUiCollectionAvatarProps) {
  return collection?.imageUrl ? (
    <Avatar size={92} src={collection?.imageUrl} radius="sm" {...props} />
  ) : (
    <Avatar size={92} color="brand" radius="sm" {...props}>{`${collection?.name ? collection.name[0] : '?'}`}</Avatar>
  )
}
