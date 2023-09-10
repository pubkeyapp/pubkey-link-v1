import { Button, ButtonProps } from '@mantine/core'
import { modals } from '@mantine/modals'
import { Identity } from '@pubkey-link/sdk'
import { IdentityProviderSolana } from '@pubkey-link/web/identity/data-access'
import { SolanaClusterProvider } from '@pubkey-link/web/solana/data-access'
import { IdentityUiSolanaLinkWizard } from './identity-ui-solana-link-wizard'

export interface IdentityUiSolanaLinkButtonProps extends ButtonProps {
  items?: Identity[]
  refresh: () => void
  label?: string
}

export function IdentityUiSolanaLinkButton({ items, label, refresh, ...props }: IdentityUiSolanaLinkButtonProps) {
  return (
    <Button
      variant="light"
      {...props}
      onClick={() => {
        modals.open({
          title: 'Link Wallet',
          children: (
            <SolanaClusterProvider autoConnect={false}>
              <IdentityProviderSolana refresh={refresh}>
                <IdentityUiSolanaLinkWizard identities={items ?? []} />
              </IdentityProviderSolana>
            </SolanaClusterProvider>
          ),
        })
      }}
    >
      {label ?? 'Link Wallet'}
    </Button>
  )
}
