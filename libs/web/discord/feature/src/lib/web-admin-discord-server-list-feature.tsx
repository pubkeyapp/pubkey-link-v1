import { Button, Text } from '@mantine/core'
import { modals } from '@mantine/modals'
import { useAdminFindManyDiscordServer, useAdminGetBotInviteUrl } from '@pubkey-link/web/discord/data-access'
import { DiscordUiServerGrid } from '@pubkey-link/web/discord/ui'
import { UiAdminPage, UiBack, UiCopy, UiGroup, UiLoader, UiStack, UiWarn } from '@pubkey-link/web/ui/core'

export function WebAdminDiscordServerListFeature() {
  const { query, items } = useAdminFindManyDiscordServer({ input: { limit: 100 } })
  return (
    <UiAdminPage title="Discord Servers" leftAction={<UiBack />} rightAction={<InviteButton />}>
      {query.isLoading ? (
        <UiLoader />
      ) : items?.length ? (
        <DiscordUiServerGrid items={items} link="/admin/discord-servers/" />
      ) : (
        <UiWarn message={'No servers found'} />
      )}
    </UiAdminPage>
  )
}

function InviteButton() {
  return (
    <Button
      onClick={() => {
        modals.open({
          title: 'Invite Bot',
          children: <InviteBotModal />,
        })
      }}
    >
      Invite Bot
    </Button>
  )
}

function InviteBotModal() {
  const { isLoading, data } = useAdminGetBotInviteUrl()
  return isLoading ? (
    <UiLoader />
  ) : data?.url ? (
    <UiStack>
      <Text>
        Invite the bot to your server by clicking the link below. You can also copy the link and send it to your
        friends.
      </Text>
      <UiGroup position="center" spacing="xs" align="center">
        <Button variant="light" component="a" href={data.url} target="_blank">
          Invite Bot
        </Button>
        <UiCopy text={data.url} />
      </UiGroup>
    </UiStack>
  ) : (
    <UiWarn message="Error loading bot invite url" />
  )
}
