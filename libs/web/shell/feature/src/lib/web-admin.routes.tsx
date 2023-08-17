import { WebAdminCollectionRoutes } from '@pubkey-link/web/collection/feature'
import { WebDevAdminRoutes } from '@pubkey-link/web/dev/feature'
import { WebAdminDiscordServerRoutes } from '@pubkey-link/web/discord/feature'
import { WebAdminNetworkRoutes } from '@pubkey-link/web/network/feature'
import { WebAdminQueueRoutes } from '@pubkey-link/web/queue/feature'
import { UiContainer, UiDashboard, UiNotFound } from '@pubkey-link/web/ui/core'
import { WebAdminUserRoutes } from '@pubkey-link/web/user/feature'
import {
  IconBrandDiscord,
  IconBug,
  IconLayoutCollage,
  IconNetwork,
  IconStackPush,
  IconUsers,
} from '@tabler/icons-react'
import { Navigate, useRoutes } from 'react-router-dom'

export default function WebAdminRoutes() {
  return useRoutes([
    { index: true, element: <Navigate to="dashboard" replace /> },
    {
      path: 'dashboard/*',
      element: (
        <UiContainer>
          <UiDashboard
            links={[
              { label: 'Collections', icon: IconLayoutCollage, link: '/admin/collections' },
              { label: 'Development', icon: IconBug, link: '/admin/development' },
              { label: 'Discord Servers', icon: IconBrandDiscord, link: '/admin/discord-servers' },
              { label: 'Networks', icon: IconNetwork, link: '/admin/networks' },
              { label: 'Queues', icon: IconStackPush, link: '/admin/queues' },
              { label: 'Users', icon: IconUsers, link: '/admin/users' },
            ]}
          />
        </UiContainer>
      ),
    },
    { path: 'collections/*', element: <WebAdminCollectionRoutes /> },
    { path: 'development/*', element: <WebDevAdminRoutes /> },
    { path: 'discord-servers/*', element: <WebAdminDiscordServerRoutes /> },
    { path: 'networks/*', element: <WebAdminNetworkRoutes /> },
    { path: 'queues/*', element: <WebAdminQueueRoutes /> },
    { path: 'users/*', element: <WebAdminUserRoutes /> },
    { path: '*', element: <UiNotFound /> },
  ])
}
