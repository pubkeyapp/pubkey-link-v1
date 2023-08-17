import { useAdminNetwork } from '@pubkey-link/web/network/data-access'
import { UiAdminPage, UiBack, UiError, UiLoader, UiStack, UiTabRoutes } from '@pubkey-link/web/ui/core'
import { useParams } from 'react-router-dom'
import { WebAdminNetworkDetailOverviewTab } from './web-admin-network-detail-overview-tab'
import { WebAdminNetworkDetailSettingsTab } from './web-admin-network-detail-settings.tab'

export function WebAdminNetworkDetailFeature() {
  const { networkId } = useParams<{ networkId: string }>() as { networkId: string }
  const { query, network } = useAdminNetwork(networkId)

  return (
    <UiAdminPage leftAction={<UiBack />} title={network?.name ?? '...'}>
      <UiStack>
        {query.isLoading ? (
          <UiLoader />
        ) : network ? (
          <UiTabRoutes
            tabs={[
              {
                value: 'overview',
                label: 'Overview',
                component: <WebAdminNetworkDetailOverviewTab networkId={networkId} />,
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
