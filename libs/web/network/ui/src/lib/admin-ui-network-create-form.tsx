import { AdminCreateNetworkInput, NetworkType } from '@pubkey-link/sdk'
import { formFieldSelect, formFieldText, UiForm, UiFormField } from '@pubkey-link/web/ui/core'
import { Button, Group } from '@mantine/core'

export interface AdminUiNetworkCreateFormProps {
  submit: (res: AdminCreateNetworkInput) => Promise<boolean>
}
export function networkTypeOptions(): { label: string; value: NetworkType }[] {
  return Object.keys(NetworkType).map((key: string) => ({ label: key, value: NetworkType[key as NetworkType] }))
}

export function AdminUiNetworkCreateForm({ submit }: AdminUiNetworkCreateFormProps) {
  const model: AdminCreateNetworkInput = {
    type: NetworkType.SolanaMainnet,
    name: '',
    endpoint: '',
  }

  const fields: UiFormField<AdminCreateNetworkInput>[] = [
    formFieldSelect('type', {
      label: 'Network Type',
      options: networkTypeOptions(),
      required: true,
    }),
    formFieldText('name', {
      label: 'Name',
      required: true,
    }),
    formFieldText('endpoint', {
      label: 'Endpoint',
      required: true,
    }),
  ]

  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(res as AdminCreateNetworkInput)}>
      <Group position="right">
        <Button type="submit">Create</Button>
      </Group>
    </UiForm>
  )
}
