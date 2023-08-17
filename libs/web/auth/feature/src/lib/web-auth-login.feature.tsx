import { Box, Button, Group, Title } from '@mantine/core'
import { PubKeyLogoRounded } from '@pubkeyapp/logo'
import { LoginInput } from '@pubkey-link/sdk'
import { useWebAuth } from '@pubkey-link/web/auth/data-access'
import { AuthUiLoginForm } from '@pubkey-link/web/auth/ui'
import { UiFull, UiLoader, UiStack } from '@pubkey-link/web/ui/core'
import { WebUserUiAvatar } from '@pubkey-link/web/user/ui'
import { IconBrandDiscord } from '@tabler/icons-react'
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

export default function WebAuthLoginFeature() {
  const { login, user, appConfig, appConfigLoading } = useWebAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [loading, setLoading] = useState(false)

  const redirect = location.state?.from?.pathname || '/dashboard'
  async function loginHandler(input: LoginInput) {
    setLoading(true)
    // Delay for a second to show loading state
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return login(input).then((res) => {
      if (res) {
        navigate(redirect)
      }
      setLoading(false)
      return !!res
    })
  }

  if (appConfigLoading || !appConfig) {
    return <UiLoader />
  }

  const { authDiscordEnabled, authPasswordEnabled, authRegisterEnabled } = appConfig

  if (!authDiscordEnabled && !authRegisterEnabled && !authPasswordEnabled) {
    return (
      <UiFull>
        <UiStack spacing="xl">
          <Group position="center">
            <PubKeyLogoRounded size={48} />
            <Title>PubKey</Title>
          </Group>
          <Group position="center">
            <Title>Login is disabled</Title>
          </Group>
        </UiStack>
      </UiFull>
    )
  }

  return (
    <UiFull>
      <Box miw={400} p="lg">
        <UiStack spacing={48}>
          <Group position="center">
            <PubKeyLogoRounded size={48} />
            <Title>PubKey</Title>
          </Group>
          {user && (
            <Button
              radius="md"
              size="xl"
              disabled={loading}
              fullWidth
              onClick={() => navigate(redirect)}
              leftIcon={<WebUserUiAvatar user={user} size={28} />}
            >
              Continue as {user.username}
            </Button>
          )}
          {authDiscordEnabled ? (
            <Button
              radius="md"
              size="xl"
              component="a"
              href="/api/auth/discord"
              variant="light"
              leftIcon={<IconBrandDiscord size={28} />}
            >
              Sign in with Discord
            </Button>
          ) : null}
          {authPasswordEnabled ? (
            <AuthUiLoginForm submit={loginHandler}>
              <Group position="apart">
                <Button loading={loading} type="submit">
                  Login
                </Button>
              </Group>
            </AuthUiLoginForm>
          ) : authRegisterEnabled ? (
            <Button disabled={loading} component={Link} to="/register" variant="default">
              Register
            </Button>
          ) : null}
        </UiStack>
      </Box>
    </UiFull>
  )
}
