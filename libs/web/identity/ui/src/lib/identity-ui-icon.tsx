import { IdentityProvider } from '@pubkey-link/sdk'
import { IconBrandDiscord, IconCurrencySolana, IconQuestionMark } from '@tabler/icons-react'

export function IdentityUiIcon({ provider }: { provider: IdentityProvider }) {
  switch (provider) {
    case IdentityProvider.Discord:
      return <IconBrandDiscord />
    case IdentityProvider.Solana:
      return <IconCurrencySolana />
    default:
      return <IconQuestionMark />
  }
}
