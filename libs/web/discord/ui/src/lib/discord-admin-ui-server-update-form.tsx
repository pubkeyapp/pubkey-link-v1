import { Button, Group } from '@mantine/core'
import { AdminUpdateDiscordServerInput, DiscordServer } from '@pubkey-link/sdk'
import { useWebSdk } from '@pubkey-link/web/shell/data-access'
import { formFieldSelect, UiForm, UiFormField, UiLoader } from '@pubkey-link/web/ui/core'
import { useQuery } from '@tanstack/react-query'
import { ReactNode, useMemo } from 'react'

export interface AuthUiDiscordServerUpdateFormProps {
  children?: ReactNode
  item: DiscordServer
  submit: (input: AdminUpdateDiscordServerInput) => Promise<boolean>
}

function useAdminDiscordServerChannels(serverId: string) {
  const sdk = useWebSdk()

  const query = useQuery({
    queryKey: ['admin', 'discord-server', 'channels', serverId],
    queryFn: () => sdk.adminGetDiscordServerChannels({ serverId }).then((res) => res.data),
  })

  const options = useMemo(() => {
    if (!query.data?.items) return []
    return query.data?.items.map((item) => ({
      value: item.id,
      label: item.name,
    }))
  }, [query.data?.items])

  return { query, options }
}

export function AuthUiDiscordServerUpdateForm({ children, item, submit }: AuthUiDiscordServerUpdateFormProps) {
  const { query, options } = useAdminDiscordServerChannels(item.id)
  const model: AdminUpdateDiscordServerInput = {
    botChannel: item.botChannel ?? '',
  }

  const fields: UiFormField<AdminUpdateDiscordServerInput>[] = [
    formFieldSelect('botChannel', {
      label: 'Bot Channel',
      description: 'Channel in this server where the bot will log events',
      options,
    }),
  ]

  if (query.isLoading) {
    return <UiLoader />
  }

  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(res as AdminUpdateDiscordServerInput)}>
      <Group position="right">
        {children}
        <Button type="submit">Update</Button>
      </Group>
    </UiForm>
  )
}
