import { useRoutes } from 'react-router-dom'
import { WebAdminDiscordServerDetailFeature } from './web-admin-discord-server-detail-feature'
import { WebAdminDiscordServerListFeature } from './web-admin-discord-server-list-feature'

export default function WebAdminDiscordServerRoutes() {
  return useRoutes([
    { path: '', element: <WebAdminDiscordServerListFeature /> },
    { path: ':serverId/*', element: <WebAdminDiscordServerDetailFeature /> },
  ])
}
