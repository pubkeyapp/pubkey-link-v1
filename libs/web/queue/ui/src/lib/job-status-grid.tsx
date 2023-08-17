import { Group, Paper, SimpleGrid, Text } from '@mantine/core'
import { JobStatus } from '@pubkey-link/sdk'

export function JobStatusGrid({ data }: { data: { label: JobStatus; value: number }[] }) {
  const stats = data.map((stat) => {
    return (
      <Paper key={stat.label}>
        <Group position="apart">
          <div>
            <Text color="dimmed" transform="uppercase" weight={700} size="xs">
              {stat.label}
            </Text>
            <Text weight={700} size="xl">
              {stat.value}
            </Text>
          </div>
        </Group>
      </Paper>
    )
  })

  return (
    <SimpleGrid cols={3} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
      {stats}
    </SimpleGrid>
  )
}
