import { User } from '@pubkey-link/sdk'
import { UiGroup } from '@pubkey-link/web/ui/core'
import { Anchor, GroupProps, Stack } from '@mantine/core'
import { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { WebUserUiAvatar } from './web-user-ui-avatar'
import { WebUserUiVerified } from './web-user-ui.verified'

export interface WebUserUiUserProps extends GroupProps {
  action?: ReactNode
  avatar?: ReactNode
  children?: ReactNode
  content?: ReactNode
  status?: ReactNode
  user?: User
}

export function WebUserUiUser({ action, avatar, children, content, status, user, ...props }: WebUserUiUserProps) {
  return (
    <UiGroup position="left" style={{ flexGrow: 1 }} align={content ? 'start' : 'center'} {...props}>
      {avatar ? avatar : <WebUserUiAvatar user={user} mt={content ? 'xs' : undefined} />}
      <Stack spacing={0} style={{ flexGrow: 1 }}>
        <UiGroup>
          <UiGroup position="left" spacing={4} align="baseline">
            {user?.username ? (
              <Anchor component={Link} to={`/profile/${user.username}`} weight={700}>
                {user?.username ?? 'Unknown'}
              </Anchor>
            ) : null}
            <WebUserUiVerified user={user} />
            {status}
          </UiGroup>
          {action}
        </UiGroup>
        {content}
      </Stack>
      {children}
    </UiGroup>
  )
}
