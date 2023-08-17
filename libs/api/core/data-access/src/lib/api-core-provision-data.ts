import { faker } from '@faker-js/faker'
import { IdentityProvider, NetworkType, Prisma, UserRole, UserStatus } from '@prisma/client'

const COLLECTION_BINARY_FORCE = 'SoLPr7zxggXh9JUt8NGKyxLZGJmyWqgawcs9N9hmatP'
const COLLECTION_DTP = 'GoLMLLR6iSUrA6KsCrFh7f45Uq5EHFQ3p8RmzPoUH9mb'
const COLLECTION_FACELESS = 'WoMbiTtXKwUtf4wosoffv45khVF8yA2mPkinGosCFQ4'
const COLLECTION_MAD_LADS = 'J1S9H3QjnRtBbbuD4HjPV6RpRhwuk4zKbxsnCHuTgh9w'
const COLLECTION_SMB = 'SMBtHCCC6RYRutFEPb4gZqeBLUZbMNhRKaMKZZLHi7W'

function connectCondition(
  account: string,
  combo?: string,
): Prisma.DiscordRoleConditionCreateNestedManyWithoutRoleInput {
  return {
    create: [
      {
        collections: { connect: { account_network: { network: NetworkType.SolanaMainnet, account } } },
        combos: combo
          ? {
              connect: {
                name_collectionAccount_network: {
                  network: NetworkType.SolanaMainnet,
                  name: combo,
                  collectionAccount: account,
                },
              },
            }
          : undefined,
      },
    ],
  }
}

export const provisionDiscordServers: Prisma.DiscordServerCreateInput[] = [
  {
    id: '1083213946078625853',
    name: 'PubKey Dev',
    icon: 'd4acf1daa1b5f65ea2dd271c87624deb',
    owner: false,
    permissions: '137411408940609',
    botChannel: '1131826826545746030',
    features: [],
    roles: {
      create: [
        {
          id: '1131732278821785640',
          name: 'McDegens',
          color: 15844367,
          hoist: false,
          position: 5,
          permissions: '0',
          managed: false,
          mentionable: false,
          conditions: connectCondition(COLLECTION_FACELESS, 'McDegens'),
        },
        {
          id: '1131732336610910238',
          name: 'Mad Lads',
          color: 15158332,
          hoist: false,
          position: 4,
          permissions: '0',
          managed: false,
          mentionable: false,
          conditions: connectCondition(COLLECTION_MAD_LADS),
        },
        {
          id: '1131732521822978128',
          name: 'Degen Trash Pandas',
          color: 15158332,
          hoist: false,
          position: 3,
          permissions: '0',
          managed: false,
          mentionable: false,
          conditions: connectCondition(COLLECTION_DTP),
        },
        {
          id: '1131732545889910814',
          name: 'Solana Monke Business',
          color: 15158332,
          hoist: false,
          position: 2,
          permissions: '0',
          managed: false,
          mentionable: false,
          conditions: connectCondition(COLLECTION_SMB),
        },
        {
          id: '1131732680187318303',
          name: 'The Faceless',
          color: 15158332,
          hoist: false,
          position: 1,
          permissions: '0',
          managed: false,
          mentionable: false,
          conditions: connectCondition(COLLECTION_FACELESS),
        },
      ],
    },
  },
  {
    id: '1074745933163671562',
    name: 'PubKey',
    icon: '4dffc8f882606b613f6e69a44e3813df',
    owner: false,
    botChannel: '1133787923569987634',
    permissions: '111023062634048',
    features: ['NEWS', 'AUTO_MODERATION', 'COMMUNITY'],
    roles: {
      create: [
        {
          id: '1131809365159071805',
          name: 'McDegens',
          color: 15844367,
          hoist: false,
          position: 7,
          permissions: '0',
          managed: false,
          mentionable: false,
          conditions: connectCondition(COLLECTION_FACELESS, 'McDegens'),
        },
        {
          id: '1131809690347651092',
          name: 'The Faceless',
          color: 12745742,
          hoist: false,
          position: 6,
          permissions: '0',
          managed: false,
          mentionable: false,
          conditions: connectCondition(COLLECTION_FACELESS),
        },
        {
          id: '1131809735016984596',
          name: 'Degen Trash Pandas',
          color: 3066993,
          hoist: false,
          position: 5,
          permissions: '0',
          managed: false,
          mentionable: false,
          conditions: connectCondition(COLLECTION_DTP),
        },
        {
          id: '1131809772866371585',
          name: 'Mad Lads',
          color: 10038562,
          hoist: false,
          position: 4,
          permissions: '0',
          managed: false,
          mentionable: false,
          conditions: connectCondition(COLLECTION_MAD_LADS),
        },
        {
          id: '1131809831863455855',
          name: 'Solana Monke Business',
          color: 2067276,
          hoist: false,
          position: 3,
          permissions: '0',
          managed: false,
          mentionable: false,
          conditions: connectCondition(COLLECTION_SMB),
        },
        {
          id: '1133803372416335912',
          name: 'MAD LAD',
          color: 16711684,
          hoist: false,
          position: 2,
          permissions: '0',
          managed: false,
          mentionable: false,
          conditions: connectCondition(COLLECTION_MAD_LADS),
        },
      ],
    },
  },
]

export const provisionUsers: Prisma.UserCreateInput[] = [
  {
    username: 'alice',
    password: 'password',
    role: UserRole.Admin,
    developer: true,
    identities: {
      create: [{ provider: IdentityProvider.Solana, providerId: 'ALiC98dw6j47Skrxje3zBN4jTA11w67JRjQRBeZH3BRG' }],
    },
  },
  {
    username: 'beeman',
    avatarUrl: 'https://avatars.githubusercontent.com/u/36491?v=4',
    name: 'beeman 🐝',
    status: UserStatus.Active,
    role: UserRole.Admin,
    developer: true,
    identities: {
      create: [
        {
          provider: IdentityProvider.Discord,
          providerId: '386584531353862154',
          name: 'beeman.dev',
        },
        {
          provider: IdentityProvider.Solana,
          providerId: 'Dd1JSwojUsptwFa97A3WRZU1SijCWYo9Qa3xLxT8yzb7',
          name: 'beeman.sol',
        },
        {
          provider: IdentityProvider.Solana,
          providerId: '3XN71ShwyPNYZ22fV4phQCnyPj6E6EbMLAD5ReLRvdRP',
          name: 'beeman#8333',
        },
        {
          provider: IdentityProvider.Solana,
          providerId: 'BumrJWH5kf4MXZ5bEg7VyZY6oXAMr78jXC1mFiDAE3u3',
          name: 'Backpack',
        },
      ],
    },
  },
  {
    username: 'bob',
    password: 'password',
    role: UserRole.User,
  },
  // Charlie is a user with no password, so they can only log in with an external provider
  {
    username: 'charlie',
    role: UserRole.User,
  },
  // Dave is set to inactive, so they can't log in
  {
    username: 'dave',
    password: 'password',
    role: UserRole.User,
    status: UserStatus.Inactive,
  },
]

function createCombo(name: string, collectionId: string, attributes: { key: string; value: string }[]) {
  return {
    id: name.toLowerCase().replace(/\s/g, '-'),
    name,
    collection: { connect: { id: collectionId } },
    Network: { connect: { type: NetworkType.SolanaMainnet } },
    attributes: {
      connect: attributes.map(({ key, value }) => ({ key_value_collectionId: { key, value, collectionId } })),
    },
  }
}

export const provisionCombos: Prisma.CollectionComboCreateInput[] = [
  createCombo('McDegens', 'the-faceless', [
    { key: 'Headwear', value: 'McDegens' },
    { key: 'Outfits', value: 'McDegens' },
  ]),
  createCombo('McDegens CEO', 'the-faceless', [
    { key: 'Headwear', value: 'McDegens' },
    { key: 'Outfits', value: 'Red Suit' },
  ]),
  createCombo('McDegens Trainee', 'the-faceless', [
    { key: 'Headwear', value: 'McDegens' },
    { key: 'Outfits', value: 'Hawain Shirt' },
  ]),
  createCombo('Minifig McDegen', 'the-faceless', [
    { key: 'Headwear', value: 'McDegens' },
    { key: 'Outfits', value: 'McDegens' },
    { key: 'Masks', value: 'Gold' },
    { key: 'Hoods', value: 'Gold' },
  ]),
  createCombo('Zombie McDegen', 'the-faceless', [
    { key: 'Headwear', value: 'McDegens' },
    { key: 'Outfits', value: 'McDegens' },
    { key: 'Masks', value: 'Green' },
    { key: 'Hoods', value: 'Undead' },
  ]),
  createCombo('Ape McDegen', 'the-faceless', [
    { key: 'Headwear', value: 'McDegens' },
    { key: 'Outfits', value: 'McDegens' },
    { key: 'Masks', value: 'Skull' },
    { key: 'Hoods', value: 'Black' },
  ]),
  createCombo('Calvin McDegen', 'the-faceless', [
    { key: 'Headwear', value: 'McDegens' },
    { key: 'Outfits', value: 'McDegens' },
    { key: 'Masks', value: 'Clown' },
  ]),
  createCombo('Boogle McDegen', 'the-faceless', [
    { key: 'Headwear', value: 'McDegens' },
    { key: 'Outfits', value: 'McDegens' },
    { key: 'Masks', value: 'White' },
    { key: 'Hoods', value: 'Black' },
  ]),
  createCombo('Soulless McDegen', 'the-faceless', [
    { key: 'Headwear', value: 'McDegens' },
    { key: 'Outfits', value: 'McDegens' },
    { key: 'Masks', value: 'Skull' },
    { key: 'Hoods', value: 'Undead' },
  ]),
  createCombo('Monke McDegen', 'the-faceless', [
    { key: 'Headwear', value: 'McDegens' },
    { key: 'Outfits', value: 'McDegens' },
    { key: 'Masks', value: 'Wood' },
    { key: 'Hoods', value: 'Black' },
  ]),
]

// Get the unique values from the combos
const uniqueMap = new Map<string, { key: string; value: string }>()
for (const provisionCombo of provisionCombos) {
  if (
    provisionCombo.attributes &&
    Array.isArray(provisionCombo.attributes.connect) &&
    provisionCombo.attributes.connect.length > 0
  ) {
    for (const attribute of provisionCombo.attributes.connect) {
      if (!attribute.key_value_collectionId) {
        continue
      }
      const { key, value } = attribute.key_value_collectionId
      uniqueMap.set(`${key}-${value}`, { key, value })
    }
  }
}

const facelessComboAttributes = Array.from(uniqueMap.values())

export const provisionNetworks: Prisma.NetworkCreateInput[] = [
  {
    id: 'solana-devnet',
    name: 'Solana Devnet',
    type: NetworkType.SolanaDevnet,
    endpoint: `https://solana-devnet.pubkey.network`,
  },
  {
    id: 'solana-mainnet',
    name: 'Solana Mainnet',
    type: NetworkType.SolanaMainnet,
    endpoint: `https://solana-mainnet.pubkey.network`,
    tokens: {
      create: [
        { address: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263', decimals: 5, name: 'BONK', symbol: 'BONK' },
        { address: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', decimals: 6, name: 'USDC', symbol: 'USDC' },
      ],
    },
    collections: {
      create: [
        {
          account: COLLECTION_BINARY_FORCE,
          name: 'Binary Force',
          id: 'binary-force',
        },
        {
          account: COLLECTION_DTP,
          name: 'Degen Trash Pandas',
          id: 'degen-trash-pandas',
        },
        {
          account: COLLECTION_FACELESS,
          name: 'The Faceless',
          id: 'the-faceless',
          attributes: { create: [...facelessComboAttributes] },
        },
        {
          account: COLLECTION_MAD_LADS,
          name: 'Mad Lads',
          id: 'mad-lads',
        },
        {
          account: COLLECTION_SMB,
          name: 'Solana Monke Business',
          id: 'solana-monke-business',
        },
      ],
    },
  },
]

export function fakeUsers(count: number): Prisma.UserCreateInput[] {
  return Array.from({ length: count }, (_, index) => fakeUser(index))
}

export function fakeUser(index: number): Prisma.UserCreateInput {
  faker.seed(index)
  const username = faker.internet.userName()
  const password = faker.internet.password()
  const email = faker.internet.email()
  const avatarUrl = faker.internet.avatar()
  const name = faker.internet.displayName()

  return {
    avatarUrl,
    emails: { create: { email } },
    name,
    password,
    role: UserRole.User,
    status: UserStatus.Active,
    username,
  }
}
