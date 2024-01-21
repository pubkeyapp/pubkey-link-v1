import { Button, Tooltip } from '@mantine/core'
import { modals } from '@mantine/modals'
import { ellipsify, Identity, IdentityProvider } from '@pubkey-link/sdk'
import { IdentityProviderSolana } from '@pubkey-link/web/identity/data-access'
import { SolanaClusterProvider } from '@pubkey-link/web/solana/data-access'
import { IconAlertCircle } from '@tabler/icons-react'
import { IdentityUiSolanaVerifyWizard } from './identity-ui-solana-verify-wizard'

export function IdentityUiSolanaVerifyButton({ identity, refresh }: { identity: Identity; refresh: () => void }) {
  return identity.provider === IdentityProvider.Solana ? (
    <Tooltip label={`Verify ${ellipsify(identity.providerId)} by signing a message with your wallet.`}>
      <Button
        size="xs"
        variant="light"
        color="yellow"
        leftIcon={<IconAlertCircle size={14} />}
        onClick={() => {
          modals.open({
            title: 'Verify Identity',
            children: (
              <SolanaClusterProvider autoConnect={true}>
                <IdentityProviderSolana refresh={refresh}>
                  <IdentityUiSolanaVerifyWizard identity={identity} refresh={refresh} />
                </IdentityProviderSolana>
              </SolanaClusterProvider>
            ),
          })
        }}
      >
        Verify Identity
      </Button>
    </Tooltip>
  ) : null
}
