import { Select } from '@mantine/core'
import { DiscordRole } from '@pubkey-link/sdk'
import { useState } from 'react'

export function DiscordUiRoleSelect({ roles, select }: { roles: DiscordRole[]; select: (roleId: string) => void }) {
  const [selected, setSelected] = useState<string | null>(null)
  const data = roles.map((role) => ({
    label: `${role.name}`,
    value: `${role.id}`,
  }))

  return (
    <Select
      placeholder="Select role"
      data={data}
      value={selected}
      onChange={(value) => {
        setSelected(value)
        if (value) {
          select(value)
        }
      }}
      filter={(value, item) => item.name?.toLowerCase().includes(value.toLowerCase().trim())}
    />
  )
}
