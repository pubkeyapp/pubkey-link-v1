import { UiContainer, UiTabRoutes } from '@pubkey-link/web/ui/core'
import { WebDevCheckAccountFeature } from './web-dev-check-account-feature'
import { WebDevCheckIdentityFeature } from './web-dev-check-identity-feature'
import { WebDevProfileFeature } from './web-dev-profile-feature'

export default function WebDevAdminRoutes() {
  return (
    <UiContainer>
      <UiTabRoutes
        tabs={[
          { value: 'check-identity', label: 'Check Identity', component: <WebDevCheckIdentityFeature /> },
          { value: 'check-account', label: 'Check Account', component: <WebDevCheckAccountFeature /> },
          { value: 'profile', label: 'Profile', component: <WebDevProfileFeature /> },
        ]}
      />
    </UiContainer>
  )
}
