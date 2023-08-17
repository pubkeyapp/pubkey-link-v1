import { Button, Group } from '@mantine/core'
import { AdminCreateNetworkTokenInput, NetworkType } from '@pubkey-link/sdk'
import { formFieldNumber, formFieldText, UiForm, UiFormField } from '@pubkey-link/web/ui/core'

export interface AdminUiNetworkTokenCreateFormProps {
  submit: (res: AdminCreateNetworkTokenInput) => Promise<boolean>
}

export function AdminUiNetworkTokenCreateForm({ submit }: AdminUiNetworkTokenCreateFormProps) {
  const model: AdminCreateNetworkTokenInput = {
    network: NetworkType.SolanaMainnet,
    symbol: '',
    address: '',
    decimals: 1,
  }

  const fields: UiFormField<AdminCreateNetworkTokenInput>[] = [
    formFieldText('address', {
      label: 'Address',
      required: true,
    }),
    formFieldText('symbol', {
      label: 'Symbol',
      required: true,
    }),
    formFieldNumber('decimals', {
      label: 'Decimals',
      required: true,
    }),
  ]

  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(res as AdminCreateNetworkTokenInput)}>
      <Group position="right">
        <Button type="submit">Create</Button>
      </Group>
    </UiForm>
  )
}
