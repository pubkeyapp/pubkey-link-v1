import { useAdminFindOneNetwork } from '@pubkey-link/web/network/data-access'
import { AdminUiNetworkAssetSearchForm } from '@pubkey-link/web/network/ui'
import { UiDebug } from '@pubkey-link/web/ui/core'
import { useState } from 'react'

export function WebAdminNetworkDetailAssetsTab({ networkId }: { networkId: string }) {
  const { searchAsset } = useAdminFindOneNetwork({ networkId })
  const [result, setResult] = useState<unknown>()
  return (
    <div>
      <AdminUiNetworkAssetSearchForm
        submit={({ mint }) =>
          searchAsset(mint).then((res) => {
            setResult(res)
            return true
          })
        }
      />

      {result ? <UiDebug data={result} open /> : null}
    </div>
  )
}
