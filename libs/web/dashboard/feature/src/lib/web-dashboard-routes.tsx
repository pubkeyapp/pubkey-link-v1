import { Button } from '@mantine/core'
import { useWebAuth } from '@pubkey-link/web/auth/data-access'
import { DiscordUiServerSummary } from '@pubkey-link/web/discord/ui'
import { useUserIdentities } from '@pubkey-link/web/identity/data-access'
import {
  IdentityUiConnect,
  IdentityUiDiscordLinkButton,
  IdentityUiIdentityGroupList,
} from '@pubkey-link/web/identity/ui'

import { UiContainer, UiDashboardContainer, UiPageHeader, UiStack } from '@pubkey-link/web/ui/core'
import { Link } from 'react-router-dom'

export default function WebDashboardRoutes() {
  const { user } = useWebAuth()
  const { expiredDiscord, hasDiscord, hasSolana, grouped } = useUserIdentities()

  const connectIdentities = !hasDiscord || !hasSolana

  if (!user) return null

  return (
    <UiContainer h="100%">
      {connectIdentities ? (
        <IdentityUiConnect />
      ) : expiredDiscord ? (
        <UiDashboardContainer>
          <IdentityUiDiscordLinkButton />
        </UiDashboardContainer>
      ) : (
        <UiStack spacing={64} pb={128}>
          <UiStack>
            <UiPageHeader
              title="Linked Identities"
              actions={
                <Button component={Link} to="/settings/identities" size="sm">
                  Manage Identities
                </Button>
              }
            />
            <IdentityUiIdentityGroupList grouped={grouped} />
          </UiStack>
          <DiscordUiServerSummary />
        </UiStack>
      )}
    </UiContainer>
  )
}
