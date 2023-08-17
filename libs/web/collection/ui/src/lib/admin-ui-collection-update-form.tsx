import { Button, Group } from '@mantine/core'
import { AdminUpdateCollectionInput, Collection } from '@pubkey-link/sdk'
import { formFieldText, UiForm, UiFormField } from '@pubkey-link/web/ui/core'

export interface AuthUiCollectionUpdateFormProps {
  collection: Collection
  submit: (collectionId: string, input: AdminUpdateCollectionInput) => Promise<boolean>
}

export function AuthUiCollectionUpdateForm({ collection, submit }: AuthUiCollectionUpdateFormProps) {
  const model: AdminUpdateCollectionInput = {
    name: collection.name ?? '',
    account: collection.account ?? '',
  }

  const fields: UiFormField<AdminUpdateCollectionInput>[] = [
    formFieldText('name', {
      label: 'Name',
    }),
    formFieldText('account', {
      label: 'Account',
    }),
  ]
  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(collection.id, res as AdminUpdateCollectionInput)}>
      <Group position="right">
        <Button type="submit">Update</Button>
      </Group>
    </UiForm>
  )
}
