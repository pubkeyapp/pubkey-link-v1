import { AdminCreateCollectionInput, NetworkType } from '@pubkey-link/sdk'
import { networkTypeOptions } from '@pubkey-link/web/network/ui'
import { formFieldSelect, formFieldText, UiForm, UiFormField } from '@pubkey-link/web/ui/core'
import { ReactNode } from 'react'

export interface AdminUiCollectionCreateFormProps {
  children?: ReactNode
  submit: (res: AdminCreateCollectionInput) => Promise<boolean>
}

export function AdminUiCollectionCreateForm({ children, submit }: AdminUiCollectionCreateFormProps) {
  const model: AdminCreateCollectionInput = { network: NetworkType.SolanaMainnet, account: '' }

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
  ]

  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(res as AdminCreateCollectionInput)}>
      {children}
    </UiForm>
  )
}
