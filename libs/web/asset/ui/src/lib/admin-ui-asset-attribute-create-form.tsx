import { Button, Group } from '@mantine/core'
import { AssetAttributeInput } from '@pubkey-link/sdk'
import { formFieldText, UiForm, UiFormField } from '@pubkey-link/web/ui/core'

export interface AdminUiCollectionComboCreateFormProps {
  submit: (res: AssetAttributeInput) => Promise<boolean>
}

export function AssetAttributeInputCreateForm({ submit }: AdminUiCollectionComboCreateFormProps) {
  const model: AssetAttributeInput = {
    key: '',
    value: '',
  }

  const fields: UiFormField<AssetAttributeInput>[] = [
    formFieldText('key', {
      label: 'Key',
      required: true,
    }),
    formFieldText('value', {
      label: 'Value',
      required: true,
    }),
  ]

  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(res as AssetAttributeInput)}>
      <Group position="right">
        <Button type="submit">Create</Button>
      </Group>
    </UiForm>
  )
}
