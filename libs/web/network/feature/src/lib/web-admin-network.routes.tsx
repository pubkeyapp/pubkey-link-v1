import { useRoutes } from 'react-router-dom'
import { WebAdminNetworkDetailFeature } from './web-admin-network-detail.feature'
import { WebAdminNetworkCreateFeature } from './web-admin-network-create.feature'
import { WebAdminNetworkListFeature } from './web-admin-network-list.feature'

export default function WebAdminNetworkRoutes() {
  return useRoutes([
    { path: '', element: <WebAdminNetworkListFeature /> },
    {
      path: 'create',
      element: <WebAdminNetworkCreateFeature />,
    },
    { path: ':networkId/*', element: <WebAdminNetworkDetailFeature /> },
  ])
}
