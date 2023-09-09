import { useAdminFindOneNetwork } from '@pubkey-link/web/network/data-access'
import { UiAdminPage, UiBack, UiError, UiLoader, UiStack, UiTabRoutes } from '@pubkey-link/web/ui/core'
import { useParams } from 'react-router-dom'
import { WebAdminNetworkDetailAssetsTab } from './web-admin-network-detail-assets-tab'
import { WebAdminNetworkDetailTokensTab } from './web-admin-network-detail-tokens-tab'
import { WebAdminNetworkDetailSettingsTab } from './web-admin-network-detail-settings-tab'

export function WebAdminNetworkDetailFeature() {
  const { networkId } = useParams<{ networkId: string }>() as { networkId: string }
  const { query, network } = useAdminFindOneNetwork({ networkId })

  return (
    <UiAdminPage leftAction={<UiBack />} title={network?.name ?? '...'}>
      <UiStack>
        {query.isLoading ? (
          <UiLoader />
        ) : network ? (
          <UiTabRoutes
            tabs={[
              {
                value: 'tokens',
                label: 'Tokens',
                component: <WebAdminNetworkDetailTokensTab networkId={networkId} />,
              },
              {
                value: 'assets',
                label: 'Assets',
                component: <WebAdminNetworkDetailAssetsTab networkId={networkId} />,
              },
              {
                value: 'settings',
                label: 'Settings',
                component: <WebAdminNetworkDetailSettingsTab networkId={networkId} />,
              },
            ]}
          />
        ) : (
          <UiError message="Network not found" />
        )}
      </UiStack>
    </UiAdminPage>
  )
}
