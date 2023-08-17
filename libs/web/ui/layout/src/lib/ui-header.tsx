import {
  ActionIcon,
  Anchor,
  Burger,
  Container,
  createStyles,
  Group,
  Header,
  Paper,
  rem,
  Transition,
} from '@mantine/core'
import { modals } from '@mantine/modals'
import { PubKeyLogo } from '@pubkeyapp/logo'
import { IconHelp } from '@tabler/icons-react'
import { Link, useLocation } from 'react-router-dom'
import { UiHeaderProfile } from './ui-header-profile'

const useStyles = createStyles((theme) => ({
  root: {
    zIndex: 1,
  },

  dropdown: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: 'hidden',

    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },

    [theme.fn.smallerThan('sm')]: {
      borderRadius: 0,
      padding: theme.spacing.md,
    },
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
    },
  },
}))

export interface UiHeaderProps {
  opened: boolean
  close: () => void
  toggle: () => void
  links: { link: string; label: string }[]
}

export function UiHeader({ opened, links, close, toggle }: UiHeaderProps) {
  const location = useLocation()
  const { classes, cx } = useStyles()

  const items = links.map((link) => {
    const active = location.pathname.startsWith(link.link)
    console.log('pathname', location.pathname, 'link', link.link, 'active', active)
    return (
      <Anchor
        component={Link}
        key={link.label}
        to={link.link}
        underline={false}
        className={cx(classes.link, { [classes.linkActive]: active })}
        onClick={(event) => {
          close()
        }}
      >
        {link.label}
      </Anchor>
    )
  })
  return (
    <Header height={{ base: 50, md: 70 }} className={classes.root}>
      <Container className={classes.header}>
        <Group>
          <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" />
          <Anchor component={Link} to="/dashboard" replace underline={false}>
            <Group spacing="xs">
              <PubKeyLogo size={28} />
            </Group>
          </Anchor>
          <Group spacing={5} className={classes.links}>
            {items}
          </Group>
        </Group>
        <Group>
          <ActionIcon
            size={36}
            variant="light"
            color="brand"
            radius="xl"
            onClick={() =>
              modals.open({
                title: 'Need help?',
                children: (
                  <div>
                    If you need help, please{' '}
                    <Anchor href="https://discord.gg/XxuZQeDPNf" target="_blank">
                      join our Discord
                    </Anchor>{' '}
                    and create a ticket in the <code>#support-ticket</code> channel.
                  </div>
                ),
              })
            }
          >
            <IconHelp size={34} />
          </ActionIcon>
          <UiHeaderProfile />
        </Group>
        <Transition transition="pop-top-right" duration={200} mounted={opened}>
          {(styles) => (
            <Paper className={classes.dropdown} withBorder style={styles}>
              {items}
            </Paper>
          )}
        </Transition>
      </Container>
    </Header>
  )
}
