import { Route, Routes } from 'react-router-dom'
import { WebAdminReportIndex } from './web-admin-report-index'

export default function WebAdminReportRoutes() {
  return (
    <Routes>
      <Route path="/" element={<WebAdminReportIndex />} />
    </Routes>
  )
}
