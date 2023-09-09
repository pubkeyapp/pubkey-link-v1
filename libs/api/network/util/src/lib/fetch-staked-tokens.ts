export type StakedTokenResponse = { _id: string; Tokens: { mintAddress: string }[] }[]
export type StakedTokens = { account: string; mints: string[] }[]
export async function fetchStakedTokens(vaultId: string): Promise<StakedTokens> {
  return fetch('https://us-central1-nft-anybodies.cloudfunctions.net/API_V2_GetVaultStakedTokenData', {
    body: JSON.stringify({ data: { vaultId } }),
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
  })
    .then((res) => res.json() as Promise<StakedTokenResponse>)
    .then((res) => formatResponse(res))
}

function formatResponse(res: StakedTokenResponse): StakedTokens {
  return res.map((item) => ({
    account: item._id,
    mints: item.Tokens?.map((t) => t.mintAddress),
  }))
}
