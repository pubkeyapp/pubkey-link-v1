import { Text } from '@mantine/core'
import { DiscordRole, NetworkType } from '@pubkey-link/sdk'
import { useWebAuth } from '@pubkey-link/web/auth/data-access'
import { WebProfileUiAssetAttributes } from '@pubkey-link/web/profile/ui'
import { UiStack } from '@pubkey-link/web/ui/core'

export function DiscordUiViewRoleConditions({ role }: { role: DiscordRole }) {
  const { user } = useWebAuth()

  if (!user) return null

  return (
    <UiStack>
      {role.conditions?.map((condition, index) => (
        <UiStack key={condition.id}>
          <UiStack>
            <Text size="lg" ml="md">
              Required {condition.collectionsAmount} of {condition.collections?.length} collection
              {condition.collections?.length !== 1 ? 's' : ''}
              {condition.combos?.length
                ? `
                      and ${condition.combosAmount} of ${condition.combos?.length} combo${
                    condition.combos?.length !== 1 ? 's' : ''
                  }`
                : null}
              .
            </Text>

            {condition.combos?.length
              ? condition.combos?.map(({ collectionAccount, name, network, attributes }) => (
                  <WebProfileUiAssetAttributes
                    key={name}
                    attributes={attributes ?? []}
                    name={name}
                    network={network as NetworkType}
                    collectionAccount={collectionAccount ?? ''}
                  />
                ))
              : condition.collections?.length
              ? condition.collections.map((coll) => (
                  <UiStack key={coll.id}>
                    <WebProfileUiAssetAttributes
                      name={coll.name}
                      network={coll.network as NetworkType}
                      collectionAccount={coll.account ?? ''}
                    />
                  </UiStack>
                ))
              : null}
          </UiStack>
        </UiStack>
      ))}
    </UiStack>
  )
}
