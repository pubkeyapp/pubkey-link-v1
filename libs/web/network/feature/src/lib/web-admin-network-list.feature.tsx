import { Button, Group, Select } from '@mantine/core'
import { Network, NetworkType } from '@pubkey-link/sdk'
import { useAdminNetworks } from '@pubkey-link/web/network/data-access'
import { AdminUiNetworkTable, networkTypeOptions } from '@pubkey-link/web/network/ui'
import { UiBack, UiAdminPage, UiAlert, UiLoader, UiPagination, UiSearchField } from '@pubkey-link/web/ui/core'
import { Link } from 'react-router-dom'

export function WebAdminNetworkListFeature() {
  const { deleteNetwork, pagination, query, type, setType, setSearch } = useAdminNetworks()

  return (
    <UiAdminPage
      title="Networks"
      leftAction={<UiBack />}
      rightAction={
        <Button component={Link} to="create">
          Create
        </Button>
      }
    >
      <Group>
        <UiSearchField placeholder="Search network" setSearch={setSearch} />
        <Select
          value={type?.toString() ?? ''}
          onChange={(type) => {
            pagination.setSkip(0)
            setType(type === '' ? undefined : (type as NetworkType))
          }}
          data={[{ value: '', label: 'Filter by type' }, ...networkTypeOptions()]}
        />
      </Group>

      {query.isLoading ? (
        <UiLoader />
      ) : query?.data?.items?.length ? (
        <AdminUiNetworkTable
          deleteNetwork={(network) => {
            if (!window.confirm('Are you sure?')) return
            return deleteNetwork(network.id)
          }}
          networks={query?.data?.items as Network[]}
        />
      ) : (
        <UiAlert message="Network not found" />
      )}

      <UiPagination pagination={pagination} />
    </UiAdminPage>
  )
}
