import { NetworkType } from '@prisma/client'
import { Cluster } from '@solana/web3.js'

export function convertNetworkType(type: NetworkType): Cluster {
  switch (type) {
    case 'SolanaMainnet':
      return 'mainnet-beta'
    case 'SolanaDevnet':
      return 'devnet'
    default:
      throw new Error(`Network ${type} not supported`)
  }
}
