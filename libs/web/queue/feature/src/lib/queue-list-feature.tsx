import { Anchor, Box, SimpleGrid } from '@mantine/core'
import { useAdminGetQueues } from '@pubkey-link/web/queue/data-access'
import { QueueCountStats } from '@pubkey-link/web/queue/ui'
import { UiAdminPage, UiBack, UiCard, UiLoader, UiStack } from '@pubkey-link/web/ui/core'
import { Link } from 'react-router-dom'

export function QueueListFeature() {
  const { query } = useAdminGetQueues()

  return (
    <UiAdminPage title="Queues" leftAction={<UiBack />}>
      {query.isLoading ? (
        <UiLoader />
      ) : (
        <SimpleGrid>
          {query.data?.items?.map(({ count, name, type }) => (
            <UiCard key={name}>
              <UiStack>
                <Box px={8}>
                  <Anchor size="lg" weight={500} component={Link} to={type}>
                    {name}
                  </Anchor>
                </Box>
                {count ? <QueueCountStats count={count} /> : null}
              </UiStack>
            </UiCard>
          ))}
        </SimpleGrid>
      )}
    </UiAdminPage>
  )
}
