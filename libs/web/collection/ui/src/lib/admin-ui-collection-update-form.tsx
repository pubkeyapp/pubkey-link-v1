import { Button, Group } from '@mantine/core'
import { AdminUpdateCollectionInput, Collection } from '@pubkey-link/sdk'
import { formFieldText, formFieldTextarea, UiForm, UiFormField } from '@pubkey-link/web/ui/core'

export interface AuthUiCollectionUpdateFormProps {
  collection: Collection
  submit: (collectionId: string, input: AdminUpdateCollectionInput) => Promise<boolean>
}

export function AuthUiCollectionUpdateForm({ collection, submit }: AuthUiCollectionUpdateFormProps) {
  const model: AdminUpdateCollectionInput = {
    account: collection.account ?? '',
    description: collection.description ?? '',
    imageUrl: collection.imageUrl ?? '',
    metadataUrl: collection.metadataUrl ?? '',
    name: collection.name ?? '',
    symbol: collection.symbol ?? '',
    vaultId: collection.vaultId ?? '',
  }

  const fields: UiFormField<AdminUpdateCollectionInput>[] = [
    formFieldText('account', { label: 'Account' }),
    formFieldText('name', { label: 'Name' }),
    formFieldText('imageUrl', { label: 'Image URL' }),
    formFieldText('metadataUrl', { label: 'Metadata URL' }),
    formFieldTextarea('description', { label: 'Description' }),
    formFieldTextarea('symbol', { label: 'Symbol' }),
    formFieldText('vaultId', {
      label: 'Vault ID',
      description: 'ID of the vault on anybodies.com',
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
