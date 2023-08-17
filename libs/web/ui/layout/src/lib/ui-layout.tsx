import { AppShell, useMantineTheme } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { UiLoader } from '@pubkey-link/web/ui/core'
import { ReactNode, Suspense } from 'react'
import { UiHeader } from './ui-header'

export function UiLayout({ children }: { children: ReactNode }) {
  const theme = useMantineTheme()
  const [opened, { toggle, close }] = useDisclosure(false)

  return (
    <AppShell
      header={<UiHeader links={[]} opened={opened} close={close} toggle={toggle} />}
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
          height: '100vh',
          overflow: 'auto',
        },
      }}
    >
      <Suspense fallback={<UiLoader type="full" />}>{children}</Suspense>
    </AppShell>
  )
}
