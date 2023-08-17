import { Button, Group } from '@mantine/core'
import { AdminUpdateCollectionComboInput, CollectionCombo } from '@pubkey-link/sdk'
import { formFieldText, UiForm, UiFormField } from '@pubkey-link/web/ui/core'

export interface AuthUiCollectionComboUpdateFormProps {
  collection: CollectionCombo
  submit: (collectionId: string, input: AdminUpdateCollectionComboInput) => Promise<boolean>
}

export function AuthUiCollectionComboUpdateForm({ collection, submit }: AuthUiCollectionComboUpdateFormProps) {
  const model: AdminUpdateCollectionComboInput = {
    name: collection.name ?? '',
    description: collection.description ?? '',
  }

  const fields: UiFormField<AdminUpdateCollectionComboInput>[] = [
    formFieldText('name', {
      label: 'Name',
    }),
    formFieldText('description', {
      label: 'Description',
    }),
  ]
  return (
    <UiForm
      model={model}
      fields={fields}
      submit={(res) => submit(collection.id, res as AdminUpdateCollectionComboInput)}
    >
      <Group position="right">
        <Button type="submit">Update</Button>
      </Group>
    </UiForm>
  )
}
