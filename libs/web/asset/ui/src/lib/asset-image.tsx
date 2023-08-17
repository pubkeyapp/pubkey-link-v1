import { Anchor, Group, Image, ImageProps, Modal, Text, UnstyledButton } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { Asset } from '@pubkey-link/sdk'
import { UiCopy, UiDebugModal, UiExplorerIcon } from '@pubkey-link/web/ui/core'
import { WebUserUiAvatar } from '@pubkey-link/web/user/ui'
import { Link } from 'react-router-dom'
import { AssetCard } from './asset-card'

export interface AssetProps extends ImageProps {
  item: Asset
}

export function AssetImage({ item, ...props }: AssetProps) {
  const [opened, { open, close }] = useDisclosure(false)

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        size="xl"
        title={
          <Group position="center" spacing="xs">
            <UiDebugModal data={item} />
            <UiCopy text={item.account ?? ''} tooltip={`Copy Collection Item ID (${item.account?.slice(0, 4)})... `} />
            <UiExplorerIcon path={`token/${item.id}`} />
            <Text>{item.name}</Text>
            {item.identity?.owner && (
              <Anchor component={Link} to={item.identity.owner.profileUrl ?? ''} underline={false}>
                <WebUserUiAvatar
                  tooltipLabel={`Owned by ${item.identity.owner?.username}`}
                  user={item.identity.owner}
                  size="sm"
                />
              </Anchor>
            )}
          </Group>
        }
        centered
        styles={{
          body: {
            padding: 0,
          },
        }}
      >
        <AssetCard item={item} />
      </Modal>
      <UnstyledButton display="inherit" onClick={open}>
        <Image key={item.id} src={item.image} alt={item.name} {...props} />
      </UnstyledButton>
    </>
  )
}
