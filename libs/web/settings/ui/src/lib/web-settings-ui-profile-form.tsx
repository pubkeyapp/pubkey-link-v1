import { Button, Group } from '@mantine/core'
import { User, UserUpdateUserInput } from '@pubkey-link/sdk'
import { formFieldText, UiForm, UiFormField } from '@pubkey-link/web/ui/core'

export interface WebProfileUiUpdateFormProps {
  submit: (res: UserUpdateUserInput) => Promise<boolean>
  user: User
}

export function WebSettingsUiProfileForm({ submit, user }: WebProfileUiUpdateFormProps) {
  const model: UserUpdateUserInput = {
    avatarUrl: user.avatarUrl ?? user.avatarUrl ?? '',
    developer: user.developer ?? false,
    name: user.name ?? '',
  }

  const fields: UiFormField<UserUpdateUserInput>[] = [
    formFieldText('name', { label: 'Name' }),
    formFieldText('avatarUrl', { label: 'Avatar URL' }),
  ]
  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(res as UserUpdateUserInput)}>
      <Group position="right">
        <Button type="submit">Save</Button>
      </Group>
    </UiForm>
  )
}
