import { Route, Routes } from 'react-router-dom'
import { QueueDetailFeature } from './queue-detail-feature'
import { QueueListFeature } from './queue-list-feature'

export default function WebAdminQueueRoutes() {
  return (
    <Routes>
      <Route index element={<QueueListFeature />} />
      <Route path=":type/*" element={<QueueDetailFeature />} />
    </Routes>
  )
}
