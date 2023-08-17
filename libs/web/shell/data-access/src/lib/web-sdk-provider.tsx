import { getGraphQLSdk, Sdk } from '@pubkey-link/sdk'
import { createContext, ReactNode, useContext } from 'react'

const WebSdkContext = createContext<Sdk>({} as Sdk)

export function WebSdkProvider({ children }: { children: ReactNode }) {
  const sdk: Sdk = getGraphQLSdk('/graphql')

  return <WebSdkContext.Provider value={sdk}>{children}</WebSdkContext.Provider>
}

export const useWebSdk = () => useContext(WebSdkContext)
