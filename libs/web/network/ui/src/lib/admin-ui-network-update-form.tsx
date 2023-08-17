import { Button, Group } from '@mantine/core'
import { AdminUpdateNetworkInput, Network } from '@pubkey-link/sdk'
import { formFieldText, UiForm, UiFormField } from '@pubkey-link/web/ui/core'

export interface AuthUiNetworkUpdateFormProps {
  network: Network
  submit: (networkId: string, input: AdminUpdateNetworkInput) => Promise<boolean>
}

export function AuthUiNetworkUpdateForm({ network, submit }: AuthUiNetworkUpdateFormProps) {
  const model: AdminUpdateNetworkInput = {
    name: network.name ?? '',
    endpoint: network.endpoint ?? '',
  }

  const fields: UiFormField<AdminUpdateNetworkInput>[] = [
    formFieldText('name', {
      label: 'Name',
    }),
    formFieldText('endpoint', {
      label: 'Endpoint',
    }),
  ]
  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(network.id, res as AdminUpdateNetworkInput)}>
      <Group position="right">
        <Button type="submit">Update</Button>
      </Group>
    </UiForm>
  )
}
