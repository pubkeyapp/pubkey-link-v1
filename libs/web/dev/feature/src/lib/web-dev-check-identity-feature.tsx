import { Button, Group, Select } from '@mantine/core'
import { ellipsify, IdentityProvider } from '@pubkey-link/sdk'
import { useAdminIdentities } from '@pubkey-link/web/identity/data-access'
import { useWebSdk } from '@pubkey-link/web/shell/data-access'
import { UiCard, UiDebug, UiStack } from '@pubkey-link/web/ui/core'
import { showNotificationError } from '@pubkey-link/web/ui/notifications'
import { useMemo, useState } from 'react'

export function WebDevCheckIdentityFeature() {
  const provider = IdentityProvider.Solana
  const sdk = useWebSdk()

  const { identities } = useAdminIdentities({ provider: IdentityProvider.Solana })
  // const rds = useAdminIdentity()

  const [providerId, setProviderId] = useState('')
  const [result, setResult] = useState<unknown | undefined>(undefined)
  const identityOptions = useMemo(() => {
    return identities?.map((identity) => ({
      value: identity.providerId,
      label: `${ellipsify(identity.providerId)} - ${identity.owner?.username}`,
    }))
  }, [identities])

  async function checkIdentity() {
    sdk
      .adminDevCheckIdentity({
        provider: provider,
        providerId: providerId,
      })
      .then((res) => {
        setResult(res.data?.result)
      })
      .catch((err) => {
        showNotificationError(err)
      })
  }

  return (
    <UiStack>
      <UiCard>
        <UiStack>
          <Select
            label={'Select Identity'}
            data={identityOptions}
            value={providerId}
            onChange={(item) => setProviderId(item ? item : '')}
          />

          <Group position="right">
            <Button onClick={checkIdentity} disabled={!providerId}>
              Check Identity
            </Button>
          </Group>
        </UiStack>
      </UiCard>

      <UiDebug data={{ provider, providerId, result: result ? result : '**NO RESULT**' }} open />
    </UiStack>
  )
}
