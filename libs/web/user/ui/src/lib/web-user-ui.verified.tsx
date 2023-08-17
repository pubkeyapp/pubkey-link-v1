import { User } from '@pubkey-link/sdk'
import { Text, Tooltip } from '@mantine/core'
import { IconDiscountCheckFilled } from '@tabler/icons-react'

export function WebUserUiVerified({ user }: { user?: User }) {
  return user?.verified ? (
    <Tooltip label="Verified account">
      <Text size="xs" color="blue" variant="outline">
        <IconDiscountCheckFilled size={18} stroke={1.5} />
      </Text>
    </Tooltip>
  ) : null
}
