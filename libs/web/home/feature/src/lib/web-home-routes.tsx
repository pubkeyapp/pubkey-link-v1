import { UiStack } from '@pubkey-link/web/ui/core'
import { Navigate, Route, Routes } from 'react-router-dom'
import { HomeUiHero } from './home-ui-hero'

export default function WebHomeRoutes() {
  return (
    <Routes>
      <Route
        path="/home"
        element={
          <UiStack>
            <HomeUiHero />
          </UiStack>
        }
      />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  )
}
