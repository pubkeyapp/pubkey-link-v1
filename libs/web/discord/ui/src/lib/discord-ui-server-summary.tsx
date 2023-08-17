import { Accordion, Group } from '@mantine/core'
import { useUserDiscordListServers } from '@pubkey-link/web/discord/data-access'
import { UiLoader, UiPageHeader, UiStack } from '@pubkey-link/web/ui/core'
import { ConnectToDiscord } from './connect-to-discord'
import { DiscordUiServerAvatar } from './discord-ui-server-avatar'
import { DiscordUiServerTitle } from './discord-ui-server-title'
import { DiscordUiViewServerRoles } from './discord-ui-view-server-roles'

export function DiscordUiServerSummary() {
  const query = useUserDiscordListServers()

  const items = query.data?.items ?? []

  return (
    <UiStack>
      {query.isLoading ? (
        <UiLoader />
      ) : items.length ? (
        <UiStack>
          <UiPageHeader title="Discord Server Access" />
          <Accordion variant="separated" multiple>
            {items.map((item) => (
              <Accordion.Item key={item.id} value={item.id}>
                <Accordion.Control>
                  <Group align="center">
                    <DiscordUiServerAvatar item={item} size="md" />
                    <DiscordUiServerTitle item={item} />
                  </Group>
                </Accordion.Control>
                <Accordion.Panel>
                  <DiscordUiViewServerRoles roles={item.roles ?? []} />
                </Accordion.Panel>
              </Accordion.Item>
            ))}
          </Accordion>
        </UiStack>
      ) : (
        <ConnectToDiscord />
      )}
    </UiStack>
  )
}
