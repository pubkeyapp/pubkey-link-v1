import { Button, Container, createStyles, Group, rem, Text, Title } from '@mantine/core'
import { IdentityProvider } from '@pubkey-link/sdk'
import { IdentityUiIcon } from '@pubkey-link/web/identity/ui'

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: rem(80),
    paddingBottom: rem(80),
  },

  label: {
    textAlign: 'center',
    fontWeight: 900,
    fontSize: rem(50),
    lineHeight: 1,
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2],

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(120),
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    textAlign: 'center',
    fontWeight: 900,
    fontSize: rem(38),

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(32),
    },
  },

  description: {
    maxWidth: rem(500),
    margin: 'auto',
    marginTop: theme.spacing.xl,
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
  },
}))

export function ConnectToDiscord() {
  const { classes } = useStyles()

  return (
    <Container className={classes.root}>
      <div className={classes.label}>Almost there...</div>
      <Title className={classes.title}>Connect to a Discord with PubKey</Title>
      <Text color="dimmed" size="lg" align="center" className={classes.description}>
        In order to use this application you need to join a Discord server that installed the PubKey bot.
      </Text>
      <Group position="center">
        <Button
          variant="light"
          size="lg"
          component="a"
          href="https://discord.gg/XxuZQeDPNf"
          leftIcon={<IdentityUiIcon provider={IdentityProvider.Discord} />}
        >
          Join our Discord
        </Button>
      </Group>
    </Container>
  )
}
