import { Button, Group, Modal, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { Network } from '@pubkey-link/sdk'
import { useAdminNetwork } from '@pubkey-link/web/network/data-access'
import { AdminUiNetworkTokenCreateForm, NetworkUiAdminTokenList } from '@pubkey-link/web/network/ui'
import { UiAlert, UiGroup, UiStack } from '@pubkey-link/web/ui/core'

export function WebAdminNetworkDetailOverviewTab({ networkId }: { networkId: string }) {
  const { network, deleteNetworkToken } = useAdminNetwork(networkId)

  return (
    <UiStack>
      {network ? (
        <UiStack p="md">
          <UiGroup>
            <Text size="xl" weight={700}>
              Tokens
            </Text>
            <Group>
              <AddTokenModal network={network} />
            </Group>
          </UiGroup>
          <NetworkUiAdminTokenList tokens={network.tokens ?? []} deleteToken={deleteNetworkToken} />
        </UiStack>
      ) : (
        <UiAlert message="Network not found." />
      )}
    </UiStack>
  )
}
function AddTokenModal({ network }: { network: Network }) {
  const [opened, { open, close }] = useDisclosure(false)
  const { createNetworkToken } = useAdminNetwork(network.id)

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title={`Add Token to ${network.name}`}
        transitionProps={{ transition: 'fade', duration: 200 }}
      >
        <AdminUiNetworkTokenCreateForm
          submit={(input) =>
            createNetworkToken(input).then((res) => {
              if (res) {
                close()
              }
              return res
            })
          }
        />
      </Modal>

      <Group position="center">
        <Button onClick={open}>Add Token</Button>
      </Group>
    </>
  )
}
