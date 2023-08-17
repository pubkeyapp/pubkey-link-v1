import { Button, Select, TextInput } from '@mantine/core'
import { NetworkType } from '@pubkey-link/sdk'
import { useWebSdk } from '@pubkey-link/web/shell/data-access'
import { UiCard, UiDebug, UiStack } from '@pubkey-link/web/ui/core'
import { showNotificationError } from '@pubkey-link/web/ui/notifications'
import { useState } from 'react'

export function WebDevCheckAccountFeature() {
  const sdk = useWebSdk()

  const [address, setAddress] = useState('')
  const [network, setNetwork] = useState(NetworkType.SolanaMainnet)
  const [result, setResult] = useState<unknown | undefined>(undefined)
  const networkOptions = [
    { label: 'Solana Mainnet', value: NetworkType.SolanaMainnet },
    { label: 'Solana Devnet', value: NetworkType.SolanaDevnet },
  ]

  async function checkAccount() {
    sdk
      .adminDevCheckAccount({
        address,
        type: network,
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
            label={'Select Network'}
            data={networkOptions}
            value={network}
            onChange={(item) => setNetwork(item as NetworkType)}
          />

          <TextInput
            label={'Enter Address'}
            value={address}
            onChange={(event) => setAddress(event.currentTarget.value)}
          />

          <Button onClick={checkAccount} disabled={!address}>
            Check Account
          </Button>
        </UiStack>
      </UiCard>

      <UiDebug data={{ network, address, result: result ? result : '**NO RESULT**' }} open />
    </UiStack>
  )
}
