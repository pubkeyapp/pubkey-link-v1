import { Button, Group } from '@mantine/core'
import { AdminCreateCollectionComboInput } from '@pubkey-link/sdk'
import { formFieldText, UiForm, UiFormField } from '@pubkey-link/web/ui/core'

export interface AdminUiCollectionComboCreateFormProps {
  submit: (res: AdminCreateCollectionComboInput) => Promise<boolean>
}

export function AdminUiCollectionComboCreateForm({ submit }: AdminUiCollectionComboCreateFormProps) {
  const model: AdminCreateCollectionComboInput = {
    collectionId: '',
    name: '',
    description: '',
  }

  const fields: UiFormField<AdminCreateCollectionComboInput>[] = [
    formFieldText('name', {
      label: 'Name',
      required: true,
    }),
    formFieldText('description', {
      label: 'Description',
    }),
  ]

  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(res as AdminCreateCollectionComboInput)}>
      <Group position="right">
        <Button type="submit">Create</Button>
      </Group>
    </UiForm>
  )
}
