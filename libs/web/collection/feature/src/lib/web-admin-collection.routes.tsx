import { useRoutes } from 'react-router-dom'
import { WebAdminCollectionDetailFeature } from './web-admin-collection-detail.feature'
import { WebAdminCollectionCreateFeature } from './web-admin-collection-create.feature'
import { WebAdminCollectionListFeature } from './web-admin-collection-list.feature'

export default function WebAdminCollectionRoutes() {
  return useRoutes([
    { path: '', element: <WebAdminCollectionListFeature /> },
    {
      path: 'create',
      element: <WebAdminCollectionCreateFeature />,
    },
    { path: ':collectionId/*', element: <WebAdminCollectionDetailFeature /> },
  ])
}
