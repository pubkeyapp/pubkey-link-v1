import { Anchor, SimpleGrid } from '@mantine/core'
import { DiscordServer } from '@pubkey-link/sdk'
import { UiDebugModal } from '@pubkey-link/web/ui/core'
import { Link } from 'react-router-dom'
import { DiscordUiServerCard } from './discord-ui-server-card'

export function DiscordUiServerGrid({ items, link }: { items: DiscordServer[]; link?: string }) {
  return (
    <SimpleGrid cols={3} spacing="md">
      {items.map((item) =>
        link ? (
          <Anchor component={Link} key={item.id} to={`${link}${item.id}`} underline={false}>
            <DiscordUiServerCard item={item} />
          </Anchor>
        ) : (
          <DiscordUiServerCard key={item.id} item={item} />
        ),
      )}
      <UiDebugModal data={items} />
    </SimpleGrid>
  )
}
