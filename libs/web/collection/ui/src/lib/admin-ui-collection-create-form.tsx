import { Button, Group } from '@mantine/core'
import { AdminCreateCollectionInput, NetworkType } from '@pubkey-link/sdk'
import { networkTypeOptions } from '@pubkey-link/web/network/ui'
import { formFieldSelect, formFieldText, UiForm, UiFormField } from '@pubkey-link/web/ui/core'

export interface AdminUiCollectionCreateFormProps {
  submit: (res: AdminCreateCollectionInput) => Promise<boolean>
}

export function AdminUiCollectionCreateForm({ submit }: AdminUiCollectionCreateFormProps) {
  const model: AdminCreateCollectionInput = {
    network: NetworkType.SolanaMainnet,
    name: '',
    account: '',
  }

  const fields: UiFormField<AdminCreateCollectionInput>[] = [
    formFieldSelect('network', {
      label: 'Network',
      options: networkTypeOptions(),
      required: true,
    }),
    formFieldText('account', {
      label: 'Account',
      required: true,
    }),
    formFieldText('name', {
      label: 'Name',
    }),
  ]

  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(res as AdminCreateCollectionInput)}>
      <Group position="right">
        <Button type="submit">Create</Button>
      </Group>
    </UiForm>
  )
}
