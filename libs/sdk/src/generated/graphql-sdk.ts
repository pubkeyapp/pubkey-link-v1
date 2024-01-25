// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { GraphQLClient } from 'graphql-request'
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types'
import { GraphQLError, print } from 'graphql'
import gql from 'graphql-tag'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never }
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: Date; output: Date }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any }
}

export type AdminCreateCollectionComboInput = {
  collectionId: Scalars['String']['input']
  description?: InputMaybe<Scalars['String']['input']>
  name: Scalars['String']['input']
}

export type AdminCreateCollectionInput = {
  account: Scalars['String']['input']
  network?: InputMaybe<NetworkType>
}

export type AdminCreateDiscordRoleInput = {
  name: Scalars['String']['input']
  serverId: Scalars['String']['input']
}

export type AdminCreateEmailInput = {
  email: Scalars['String']['input']
  ownerId: Scalars['String']['input']
}

export type AdminCreateIdentityInput = {
  ownerId: Scalars['String']['input']
  provider: IdentityProvider
  providerId: Scalars['String']['input']
}

export type AdminCreateNetworkInput = {
  endpoint: Scalars['String']['input']
  name: Scalars['String']['input']
  type?: InputMaybe<NetworkType>
}

export type AdminCreateNetworkTokenInput = {
  address: Scalars['String']['input']
  decimals?: InputMaybe<Scalars['Int']['input']>
  network?: InputMaybe<NetworkType>
  symbol: Scalars['String']['input']
}

export type AdminCreateUserInput = {
  password?: InputMaybe<Scalars['String']['input']>
  username: Scalars['String']['input']
}

export type AdminDeleteDiscordRoleInput = {
  roleId: Scalars['String']['input']
  serverId: Scalars['String']['input']
}

export type AdminFindEmailsInput = {
  ownerId: Scalars['String']['input']
}

export type AdminFindManyAssetInput = {
  collectionAccount?: InputMaybe<Scalars['String']['input']>
  limit?: InputMaybe<Scalars['Int']['input']>
  network?: InputMaybe<NetworkType>
  page?: InputMaybe<Scalars['Int']['input']>
  search?: InputMaybe<Scalars['String']['input']>
}

export type AdminFindManyCollectionComboInput = {
  collectionId: Scalars['String']['input']
  limit?: InputMaybe<Scalars['Int']['input']>
  network?: InputMaybe<NetworkType>
  page?: InputMaybe<Scalars['Int']['input']>
  search?: InputMaybe<Scalars['String']['input']>
}

export type AdminFindManyCollectionInput = {
  limit?: InputMaybe<Scalars['Int']['input']>
  network?: InputMaybe<NetworkType>
  page?: InputMaybe<Scalars['Int']['input']>
  search?: InputMaybe<Scalars['String']['input']>
}

export type AdminFindManyDiscordServerInput = {
  limit?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
  search?: InputMaybe<Scalars['String']['input']>
}

export type AdminFindManyIdentityInput = {
  ownerId?: InputMaybe<Scalars['String']['input']>
  provider?: InputMaybe<IdentityProvider>
}

export type AdminFindManyNetworkInput = {
  limit?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
  search?: InputMaybe<Scalars['String']['input']>
  type?: InputMaybe<NetworkType>
}

export type AdminFindManyUserInput = {
  limit?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
  role?: InputMaybe<UserRole>
  search?: InputMaybe<Scalars['String']['input']>
  status?: InputMaybe<UserStatus>
}

export type AdminReportDiscordMemberWalletsInput = {
  collectionAccount: Scalars['String']['input']
  serverId: Scalars['String']['input']
}

export type AdminUpdateCollectionComboInput = {
  description?: InputMaybe<Scalars['String']['input']>
  name?: InputMaybe<Scalars['String']['input']>
}

export type AdminUpdateCollectionInput = {
  account?: InputMaybe<Scalars['String']['input']>
  description: Scalars['String']['input']
  enableSync?: InputMaybe<Scalars['Boolean']['input']>
  imageUrl: Scalars['String']['input']
  metadataUrl: Scalars['String']['input']
  name?: InputMaybe<Scalars['String']['input']>
  symbol: Scalars['String']['input']
  vaultId?: InputMaybe<Scalars['String']['input']>
}

export type AdminUpdateDiscordServerInput = {
  adminIds?: InputMaybe<Array<Scalars['String']['input']>>
  botChannel?: InputMaybe<Scalars['String']['input']>
  enableSync?: InputMaybe<Scalars['Boolean']['input']>
}

export type AdminUpdateEmailInput = {
  default?: InputMaybe<Scalars['Boolean']['input']>
  email?: InputMaybe<Scalars['String']['input']>
  private?: InputMaybe<Scalars['Boolean']['input']>
  verified?: InputMaybe<Scalars['Boolean']['input']>
}

export type AdminUpdateNetworkInput = {
  endpoint: Scalars['String']['input']
  name: Scalars['String']['input']
}

export type AdminUpdateUserInput = {
  avatarUrl?: InputMaybe<Scalars['String']['input']>
  developer?: InputMaybe<Scalars['Boolean']['input']>
  name?: InputMaybe<Scalars['String']['input']>
  role?: InputMaybe<UserRole>
  status?: InputMaybe<UserStatus>
  username?: InputMaybe<Scalars['String']['input']>
}

export type AppConfig = {
  __typename?: 'AppConfig'
  authDiscordEnabled: Scalars['Boolean']['output']
  authPasswordEnabled: Scalars['Boolean']['output']
  authRegisterEnabled: Scalars['Boolean']['output']
}

export type Asset = {
  __typename?: 'Asset'
  account?: Maybe<Scalars['String']['output']>
  attributeMap?: Maybe<Scalars['JSON']['output']>
  attributes?: Maybe<Array<AssetAttribute>>
  collection?: Maybe<Collection>
  createdAt: Scalars['DateTime']['output']
  id: Scalars['String']['output']
  identity?: Maybe<Identity>
  image?: Maybe<Scalars['String']['output']>
  metadata?: Maybe<Scalars['JSON']['output']>
  name: Scalars['String']['output']
  network?: Maybe<NetworkType>
  owner?: Maybe<Scalars['String']['output']>
  raw?: Maybe<Scalars['JSON']['output']>
  symbol?: Maybe<Scalars['String']['output']>
  updatedAt: Scalars['DateTime']['output']
}

export type AssetAttribute = {
  __typename?: 'AssetAttribute'
  count?: Maybe<Scalars['Int']['output']>
  createdAt?: Maybe<Scalars['DateTime']['output']>
  id?: Maybe<Scalars['String']['output']>
  key: Scalars['String']['output']
  updatedAt?: Maybe<Scalars['DateTime']['output']>
  value: Scalars['String']['output']
}

export type AssetAttributeInput = {
  count?: InputMaybe<Scalars['Int']['input']>
  key: Scalars['String']['input']
  value: Scalars['String']['input']
}

export type AssetPaging = {
  __typename?: 'AssetPaging'
  data: Array<Asset>
  meta: PagingMeta
}

export type Collection = {
  __typename?: 'Collection'
  account?: Maybe<Scalars['String']['output']>
  assetCount?: Maybe<Scalars['Int']['output']>
  attributes?: Maybe<Array<AssetAttribute>>
  combos?: Maybe<Array<CollectionCombo>>
  createdAt: Scalars['DateTime']['output']
  description?: Maybe<Scalars['String']['output']>
  enableSync?: Maybe<Scalars['Boolean']['output']>
  id: Scalars['String']['output']
  imageUrl?: Maybe<Scalars['String']['output']>
  metadataUrl?: Maybe<Scalars['String']['output']>
  name: Scalars['String']['output']
  network?: Maybe<NetworkType>
  symbol?: Maybe<Scalars['String']['output']>
  updatedAt: Scalars['DateTime']['output']
  vaultId?: Maybe<Scalars['String']['output']>
}

export type CollectionCombo = {
  __typename?: 'CollectionCombo'
  attributes?: Maybe<Array<AssetAttribute>>
  collectionAccount?: Maybe<Scalars['String']['output']>
  createdAt: Scalars['DateTime']['output']
  description?: Maybe<Scalars['String']['output']>
  id: Scalars['String']['output']
  name: Scalars['String']['output']
  network?: Maybe<NetworkType>
  updatedAt: Scalars['DateTime']['output']
}

export type CollectionComboPaging = {
  __typename?: 'CollectionComboPaging'
  data: Array<CollectionCombo>
  meta: PagingMeta
}

export type CollectionPaging = {
  __typename?: 'CollectionPaging'
  data: Array<Collection>
  meta: PagingMeta
}

export type DiscordRole = {
  __typename?: 'DiscordRole'
  color?: Maybe<Scalars['Float']['output']>
  conditions?: Maybe<Array<DiscordRoleCondition>>
  hoist?: Maybe<Scalars['Boolean']['output']>
  id: Scalars['String']['output']
  managed?: Maybe<Scalars['Boolean']['output']>
  mentionable?: Maybe<Scalars['Boolean']['output']>
  name: Scalars['String']['output']
  permissions?: Maybe<Scalars['String']['output']>
  position?: Maybe<Scalars['Float']['output']>
  serverId?: Maybe<Scalars['String']['output']>
}

export type DiscordRoleCondition = {
  __typename?: 'DiscordRoleCondition'
  collections?: Maybe<Array<Collection>>
  collectionsAmount?: Maybe<Scalars['Int']['output']>
  combos?: Maybe<Array<CollectionCombo>>
  combosAmount?: Maybe<Scalars['Int']['output']>
  createdAt?: Maybe<Scalars['DateTime']['output']>
  id?: Maybe<Scalars['String']['output']>
  updatedAt?: Maybe<Scalars['DateTime']['output']>
}

export type DiscordServer = {
  __typename?: 'DiscordServer'
  adminIds?: Maybe<Array<Scalars['String']['output']>>
  botChannel?: Maybe<Scalars['String']['output']>
  enableSync: Scalars['Boolean']['output']
  enabled: Scalars['Boolean']['output']
  features?: Maybe<Array<Scalars['String']['output']>>
  icon?: Maybe<Scalars['String']['output']>
  iconUrl?: Maybe<Scalars['String']['output']>
  id: Scalars['String']['output']
  name?: Maybe<Scalars['String']['output']>
  owner?: Maybe<Scalars['Boolean']['output']>
  permissions?: Maybe<Scalars['String']['output']>
  roles?: Maybe<Array<DiscordRole>>
  serverUrl?: Maybe<Scalars['String']['output']>
}

export type DiscordServerChannel = {
  __typename?: 'DiscordServerChannel'
  id: Scalars['String']['output']
  name: Scalars['String']['output']
  type: Scalars['String']['output']
}

export type DiscordServerPaging = {
  __typename?: 'DiscordServerPaging'
  data: Array<DiscordServer>
  meta: PagingMeta
}

export type Email = {
  __typename?: 'Email'
  createdAt: Scalars['DateTime']['output']
  default?: Maybe<Scalars['Boolean']['output']>
  email: Scalars['String']['output']
  id: Scalars['String']['output']
  private?: Maybe<Scalars['Boolean']['output']>
  updatedAt: Scalars['DateTime']['output']
  verified?: Maybe<Scalars['Boolean']['output']>
}

export type Identity = {
  __typename?: 'Identity'
  challenges?: Maybe<Array<IdentityChallenge>>
  createdAt: Scalars['DateTime']['output']
  expired?: Maybe<Scalars['Boolean']['output']>
  id: Scalars['String']['output']
  name?: Maybe<Scalars['String']['output']>
  owner?: Maybe<User>
  profile?: Maybe<Scalars['JSON']['output']>
  provider: IdentityProvider
  providerId: Scalars['String']['output']
  updatedAt: Scalars['DateTime']['output']
  verified?: Maybe<Scalars['Boolean']['output']>
}

export type IdentityChallenge = {
  __typename?: 'IdentityChallenge'
  challenge: Scalars['String']['output']
  createdAt: Scalars['DateTime']['output']
  id: Scalars['String']['output']
  ip: Scalars['String']['output']
  provider: IdentityProvider
  providerId: Scalars['String']['output']
  signature?: Maybe<Scalars['String']['output']>
  updatedAt: Scalars['DateTime']['output']
  userAgent: Scalars['String']['output']
  verified: Scalars['Boolean']['output']
}

export enum IdentityProvider {
  Discord = 'Discord',
  Solana = 'Solana',
}

export type Job = {
  __typename?: 'Job'
  attemptsMade?: Maybe<Scalars['Int']['output']>
  data?: Maybe<Scalars['JSON']['output']>
  duration?: Maybe<Scalars['Int']['output']>
  failedReason?: Maybe<Scalars['String']['output']>
  finishedOn?: Maybe<Scalars['DateTime']['output']>
  id?: Maybe<Scalars['String']['output']>
  name?: Maybe<Scalars['String']['output']>
  opts?: Maybe<Scalars['JSON']['output']>
  processedOn?: Maybe<Scalars['DateTime']['output']>
  returnvalue?: Maybe<Scalars['JSON']['output']>
  stacktrace?: Maybe<Array<Scalars['String']['output']>>
  timestamp?: Maybe<Scalars['DateTime']['output']>
}

export enum JobStatus {
  Active = 'active',
  Completed = 'completed',
  Delayed = 'delayed',
  Failed = 'failed',
  Paused = 'paused',
  Waiting = 'waiting',
}

export type LinkIdentityInput = {
  provider: IdentityProvider
  providerId: Scalars['String']['input']
}

export type LoginInput = {
  password: Scalars['String']['input']
  username: Scalars['String']['input']
}

export type Mutation = {
  __typename?: 'Mutation'
  adminAddCollectionComboAttribute?: Maybe<CollectionCombo>
  adminAddDiscordRoleConditionCollection?: Maybe<Scalars['Boolean']['output']>
  adminAddDiscordRoleConditionCombo?: Maybe<Scalars['Boolean']['output']>
  adminCleanQueue?: Maybe<Scalars['Boolean']['output']>
  adminCreateBackup: Scalars['Boolean']['output']
  adminCreateCollection?: Maybe<Collection>
  adminCreateCollectionCombo?: Maybe<CollectionCombo>
  adminCreateDiscordRole?: Maybe<Scalars['Boolean']['output']>
  adminCreateDiscordRoleCondition?: Maybe<Scalars['Boolean']['output']>
  adminCreateEmail?: Maybe<Email>
  adminCreateIdentity?: Maybe<Identity>
  adminCreateNetwork?: Maybe<Network>
  adminCreateNetworkToken?: Maybe<NetworkToken>
  adminCreateUser?: Maybe<User>
  adminDeleteAsset?: Maybe<Scalars['Boolean']['output']>
  adminDeleteBackup: Scalars['Boolean']['output']
  adminDeleteCollection?: Maybe<Scalars['Boolean']['output']>
  adminDeleteCollectionCombo?: Maybe<Scalars['Boolean']['output']>
  adminDeleteDiscordRole?: Maybe<Scalars['Boolean']['output']>
  adminDeleteDiscordRoleCondition?: Maybe<Scalars['Boolean']['output']>
  adminDeleteDiscordServer?: Maybe<Scalars['Boolean']['output']>
  adminDeleteEmail?: Maybe<Scalars['Boolean']['output']>
  adminDeleteIdentity?: Maybe<Scalars['Boolean']['output']>
  adminDeleteNetwork?: Maybe<Scalars['Boolean']['output']>
  adminDeleteNetworkToken?: Maybe<Scalars['Boolean']['output']>
  adminDeleteQueueJob?: Maybe<Scalars['Boolean']['output']>
  adminDeleteUser?: Maybe<Scalars['Boolean']['output']>
  adminFetchBackup: Scalars['Boolean']['output']
  adminPauseQueue?: Maybe<Scalars['Boolean']['output']>
  adminRemoveCollectionComboAttribute?: Maybe<CollectionCombo>
  adminRemoveDiscordRoleConditionCollection?: Maybe<Scalars['Boolean']['output']>
  adminRemoveDiscordRoleConditionCombo?: Maybe<Scalars['Boolean']['output']>
  adminRestoreBackup: Scalars['Boolean']['output']
  adminResumeQueue?: Maybe<Scalars['Boolean']['output']>
  adminSyncCollection?: Maybe<Scalars['String']['output']>
  adminSyncDiscordRoles?: Maybe<Scalars['Boolean']['output']>
  adminTestDiscordServerBotChannel?: Maybe<Scalars['Boolean']['output']>
  adminUpdateCollection?: Maybe<Collection>
  adminUpdateCollectionCombo?: Maybe<CollectionCombo>
  adminUpdateDiscordServer?: Maybe<DiscordServer>
  adminUpdateEmail?: Maybe<Email>
  adminUpdateNetwork?: Maybe<Network>
  adminUpdateUser?: Maybe<User>
  login?: Maybe<User>
  logout?: Maybe<Scalars['Boolean']['output']>
  register?: Maybe<User>
  userDeleteIdentity?: Maybe<Scalars['Boolean']['output']>
  userLinkIdentity?: Maybe<Identity>
  userUpdateUser?: Maybe<User>
  userVerifyIdentityChallenge?: Maybe<IdentityChallenge>
}

export type MutationAdminAddCollectionComboAttributeArgs = {
  collectionComboId: Scalars['String']['input']
  input: AssetAttributeInput
}

export type MutationAdminAddDiscordRoleConditionCollectionArgs = {
  collectionId: Scalars['String']['input']
  conditionId: Scalars['String']['input']
}

export type MutationAdminAddDiscordRoleConditionComboArgs = {
  comboId: Scalars['String']['input']
  conditionId: Scalars['String']['input']
}

export type MutationAdminCleanQueueArgs = {
  type: QueueType
}

export type MutationAdminCreateCollectionArgs = {
  input: AdminCreateCollectionInput
}

export type MutationAdminCreateCollectionComboArgs = {
  input: AdminCreateCollectionComboInput
}

export type MutationAdminCreateDiscordRoleArgs = {
  input: AdminCreateDiscordRoleInput
}

export type MutationAdminCreateDiscordRoleConditionArgs = {
  roleId: Scalars['String']['input']
}

export type MutationAdminCreateEmailArgs = {
  input: AdminCreateEmailInput
}

export type MutationAdminCreateIdentityArgs = {
  input: AdminCreateIdentityInput
}

export type MutationAdminCreateNetworkArgs = {
  input: AdminCreateNetworkInput
}

export type MutationAdminCreateNetworkTokenArgs = {
  input: AdminCreateNetworkTokenInput
}

export type MutationAdminCreateUserArgs = {
  input: AdminCreateUserInput
}

export type MutationAdminDeleteAssetArgs = {
  assetId: Scalars['String']['input']
}

export type MutationAdminDeleteBackupArgs = {
  name: Scalars['String']['input']
}

export type MutationAdminDeleteCollectionArgs = {
  collectionId: Scalars['String']['input']
}

export type MutationAdminDeleteCollectionComboArgs = {
  collectionComboId: Scalars['String']['input']
}

export type MutationAdminDeleteDiscordRoleArgs = {
  input: AdminDeleteDiscordRoleInput
}

export type MutationAdminDeleteDiscordRoleConditionArgs = {
  conditionId: Scalars['String']['input']
}

export type MutationAdminDeleteDiscordServerArgs = {
  serverId: Scalars['String']['input']
}

export type MutationAdminDeleteEmailArgs = {
  emailId: Scalars['String']['input']
}

export type MutationAdminDeleteIdentityArgs = {
  identityId: Scalars['String']['input']
}

export type MutationAdminDeleteNetworkArgs = {
  networkId: Scalars['String']['input']
}

export type MutationAdminDeleteNetworkTokenArgs = {
  networkTokenId: Scalars['String']['input']
}

export type MutationAdminDeleteQueueJobArgs = {
  jobId: Scalars['String']['input']
  type: QueueType
}

export type MutationAdminDeleteUserArgs = {
  userId: Scalars['String']['input']
}

export type MutationAdminFetchBackupArgs = {
  url: Scalars['String']['input']
}

export type MutationAdminPauseQueueArgs = {
  type: QueueType
}

export type MutationAdminRemoveCollectionComboAttributeArgs = {
  assetAttributeId: Scalars['String']['input']
  collectionComboId: Scalars['String']['input']
}

export type MutationAdminRemoveDiscordRoleConditionCollectionArgs = {
  collectionId: Scalars['String']['input']
  conditionId: Scalars['String']['input']
}

export type MutationAdminRemoveDiscordRoleConditionComboArgs = {
  comboId: Scalars['String']['input']
  conditionId: Scalars['String']['input']
}

export type MutationAdminRestoreBackupArgs = {
  name: Scalars['String']['input']
}

export type MutationAdminResumeQueueArgs = {
  type: QueueType
}

export type MutationAdminSyncCollectionArgs = {
  collectionId: Scalars['String']['input']
}

export type MutationAdminSyncDiscordRolesArgs = {
  serverId: Scalars['String']['input']
}

export type MutationAdminTestDiscordServerBotChannelArgs = {
  serverId: Scalars['String']['input']
}

export type MutationAdminUpdateCollectionArgs = {
  collectionId: Scalars['String']['input']
  input: AdminUpdateCollectionInput
}

export type MutationAdminUpdateCollectionComboArgs = {
  collectionComboId: Scalars['String']['input']
  input: AdminUpdateCollectionComboInput
}

export type MutationAdminUpdateDiscordServerArgs = {
  input: AdminUpdateDiscordServerInput
  serverId: Scalars['String']['input']
}

export type MutationAdminUpdateEmailArgs = {
  emailId: Scalars['String']['input']
  input: AdminUpdateEmailInput
}

export type MutationAdminUpdateNetworkArgs = {
  input: AdminUpdateNetworkInput
  networkId: Scalars['String']['input']
}

export type MutationAdminUpdateUserArgs = {
  input: AdminUpdateUserInput
  userId: Scalars['String']['input']
}

export type MutationLoginArgs = {
  input: LoginInput
}

export type MutationRegisterArgs = {
  input: RegisterInput
}

export type MutationUserDeleteIdentityArgs = {
  identityId: Scalars['String']['input']
}

export type MutationUserLinkIdentityArgs = {
  input: LinkIdentityInput
}

export type MutationUserUpdateUserArgs = {
  input: UserUpdateUserInput
}

export type MutationUserVerifyIdentityChallengeArgs = {
  input: VerifyIdentityChallengeInput
}

export type Network = {
  __typename?: 'Network'
  collections?: Maybe<Array<Collection>>
  createdAt: Scalars['DateTime']['output']
  endpoint?: Maybe<Scalars['String']['output']>
  id: Scalars['String']['output']
  name: Scalars['String']['output']
  tokens?: Maybe<Array<NetworkToken>>
  type?: Maybe<NetworkType>
  updatedAt: Scalars['DateTime']['output']
}

export type NetworkPaging = {
  __typename?: 'NetworkPaging'
  data: Array<Network>
  meta: PagingMeta
}

export type NetworkToken = {
  __typename?: 'NetworkToken'
  address: Scalars['String']['output']
  createdAt: Scalars['DateTime']['output']
  decimals?: Maybe<Scalars['Int']['output']>
  id: Scalars['String']['output']
  name: Scalars['String']['output']
  network?: Maybe<NetworkType>
  price?: Maybe<Scalars['Int']['output']>
  priceDate?: Maybe<Scalars['DateTime']['output']>
  symbol: Scalars['String']['output']
  updatedAt: Scalars['DateTime']['output']
}

export enum NetworkType {
  SolanaDevnet = 'SolanaDevnet',
  SolanaMainnet = 'SolanaMainnet',
}

export type PagingMeta = {
  __typename?: 'PagingMeta'
  currentPage: Scalars['Int']['output']
  isFirstPage: Scalars['Boolean']['output']
  isLastPage: Scalars['Boolean']['output']
  nextPage?: Maybe<Scalars['Int']['output']>
  pageCount?: Maybe<Scalars['Int']['output']>
  previousPage?: Maybe<Scalars['Int']['output']>
  totalCount?: Maybe<Scalars['Int']['output']>
}

export type Query = {
  __typename?: 'Query'
  adminDevCheckAccount?: Maybe<Scalars['JSON']['output']>
  adminDevCheckIdentity?: Maybe<Scalars['JSON']['output']>
  adminFindEmails?: Maybe<Array<Email>>
  adminFindManyAsset: AssetPaging
  adminFindManyCollection: CollectionPaging
  adminFindManyCollectionCombo: CollectionComboPaging
  adminFindManyDiscordServer: DiscordServerPaging
  adminFindManyDiscordServerChannel?: Maybe<Array<DiscordServerChannel>>
  adminFindManyIdentity?: Maybe<Array<Identity>>
  adminFindManyNetwork: NetworkPaging
  adminFindManyUser: UserPaging
  adminFindOneAsset?: Maybe<Asset>
  adminFindOneCollection?: Maybe<Collection>
  adminFindOneCollectionCombo?: Maybe<CollectionCombo>
  adminFindOneDiscordServer?: Maybe<DiscordServer>
  adminFindOneNetwork?: Maybe<Network>
  adminFindOneUser?: Maybe<User>
  adminGetBackup?: Maybe<Scalars['JSON']['output']>
  adminGetBackups: Array<Scalars['String']['output']>
  adminGetBotInviteUrl?: Maybe<Scalars['String']['output']>
  adminGetQueue?: Maybe<Queue>
  adminGetQueueJobs?: Maybe<Array<Job>>
  adminGetQueues?: Maybe<Array<Queue>>
  adminReportDiscordMemberWallets?: Maybe<Scalars['JSON']['output']>
  adminSearchNetworkAsset?: Maybe<Scalars['JSON']['output']>
  appConfig: AppConfig
  me?: Maybe<User>
  uptime: Scalars['Float']['output']
  userFindManyAsset: AssetPaging
  userFindManyCollection: CollectionPaging
  userFindManyDiscordServer?: Maybe<Array<DiscordServer>>
  userFindManyIdentity?: Maybe<Array<Identity>>
  userFindManyUser: UserPaging
  userFindOneAsset?: Maybe<Asset>
  userFindOneCollection?: Maybe<Collection>
  userFindOneUser?: Maybe<User>
  userRequestIdentityChallenge?: Maybe<IdentityChallenge>
}

export type QueryAdminDevCheckAccountArgs = {
  address: Scalars['String']['input']
  type: NetworkType
}

export type QueryAdminDevCheckIdentityArgs = {
  provider: IdentityProvider
  providerId: Scalars['String']['input']
}

export type QueryAdminFindEmailsArgs = {
  input: AdminFindEmailsInput
}

export type QueryAdminFindManyAssetArgs = {
  input: AdminFindManyAssetInput
}

export type QueryAdminFindManyCollectionArgs = {
  input: AdminFindManyCollectionInput
}

export type QueryAdminFindManyCollectionComboArgs = {
  input: AdminFindManyCollectionComboInput
}

export type QueryAdminFindManyDiscordServerArgs = {
  input: AdminFindManyDiscordServerInput
}

export type QueryAdminFindManyDiscordServerChannelArgs = {
  serverId: Scalars['String']['input']
}

export type QueryAdminFindManyIdentityArgs = {
  input: AdminFindManyIdentityInput
}

export type QueryAdminFindManyNetworkArgs = {
  input: AdminFindManyNetworkInput
}

export type QueryAdminFindManyUserArgs = {
  input: AdminFindManyUserInput
}

export type QueryAdminFindOneAssetArgs = {
  assetId: Scalars['String']['input']
}

export type QueryAdminFindOneCollectionArgs = {
  collectionId: Scalars['String']['input']
}

export type QueryAdminFindOneCollectionComboArgs = {
  collectionComboId: Scalars['String']['input']
}

export type QueryAdminFindOneDiscordServerArgs = {
  serverId: Scalars['String']['input']
}

export type QueryAdminFindOneNetworkArgs = {
  networkId: Scalars['String']['input']
}

export type QueryAdminFindOneUserArgs = {
  userId: Scalars['String']['input']
}

export type QueryAdminGetBackupArgs = {
  name: Scalars['String']['input']
}

export type QueryAdminGetQueueArgs = {
  type: QueueType
}

export type QueryAdminGetQueueJobsArgs = {
  statuses: Array<JobStatus>
  type: QueueType
}

export type QueryAdminReportDiscordMemberWalletsArgs = {
  input: AdminReportDiscordMemberWalletsInput
}

export type QueryAdminSearchNetworkAssetArgs = {
  mint: Scalars['String']['input']
  networkId: Scalars['String']['input']
}

export type QueryUserFindManyAssetArgs = {
  input: UserFindManyAssetInput
}

export type QueryUserFindManyCollectionArgs = {
  input: UserFindManyCollectionInput
}

export type QueryUserFindManyUserArgs = {
  input: UserFindManyUserInput
}

export type QueryUserFindOneAssetArgs = {
  assetId: Scalars['String']['input']
}

export type QueryUserFindOneCollectionArgs = {
  collectionId: Scalars['String']['input']
}

export type QueryUserFindOneUserArgs = {
  username: Scalars['String']['input']
}

export type QueryUserRequestIdentityChallengeArgs = {
  input: RequestIdentityChallengeInput
}

export type Queue = {
  __typename?: 'Queue'
  count?: Maybe<QueueCount>
  info?: Maybe<Scalars['JSON']['output']>
  isPaused?: Maybe<Scalars['Boolean']['output']>
  name: Scalars['String']['output']
  type: QueueType
}

export type QueueCount = {
  __typename?: 'QueueCount'
  active?: Maybe<Scalars['Int']['output']>
  completed?: Maybe<Scalars['Int']['output']>
  delayed?: Maybe<Scalars['Int']['output']>
  failed?: Maybe<Scalars['Int']['output']>
  paused?: Maybe<Scalars['Int']['output']>
  waiting?: Maybe<Scalars['Int']['output']>
}

export enum QueueType {
  AssetSyncMany = 'AssetSyncMany',
  AssetUpsertMany = 'AssetUpsertMany',
  CollectionSyncOne = 'CollectionSyncOne',
  IdentitySyncMany = 'IdentitySyncMany',
  IdentitySyncOne = 'IdentitySyncOne',
}

export type RegisterInput = {
  password: Scalars['String']['input']
  username: Scalars['String']['input']
}

export type RequestIdentityChallengeInput = {
  provider: IdentityProvider
  providerId: Scalars['String']['input']
}

export type User = {
  __typename?: 'User'
  avatarUrl?: Maybe<Scalars['String']['output']>
  createdAt?: Maybe<Scalars['DateTime']['output']>
  developer?: Maybe<Scalars['Boolean']['output']>
  id: Scalars['String']['output']
  name?: Maybe<Scalars['String']['output']>
  profileUrl?: Maybe<Scalars['String']['output']>
  role?: Maybe<UserRole>
  status?: Maybe<UserStatus>
  updatedAt?: Maybe<Scalars['DateTime']['output']>
  username?: Maybe<Scalars['String']['output']>
}

export type UserFindManyAssetInput = {
  attributes?: InputMaybe<Array<AssetAttributeInput>>
  collectionAccount?: InputMaybe<Scalars['String']['input']>
  limit?: InputMaybe<Scalars['Int']['input']>
  network?: InputMaybe<NetworkType>
  ownerId?: InputMaybe<Scalars['String']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
  search?: InputMaybe<Scalars['String']['input']>
}

export type UserFindManyCollectionInput = {
  limit?: InputMaybe<Scalars['Int']['input']>
  network?: InputMaybe<NetworkType>
  page?: InputMaybe<Scalars['Int']['input']>
  search?: InputMaybe<Scalars['String']['input']>
}

export type UserFindManyUserInput = {
  limit?: InputMaybe<Scalars['Int']['input']>
  page?: InputMaybe<Scalars['Int']['input']>
  search?: InputMaybe<Scalars['String']['input']>
}

export type UserPaging = {
  __typename?: 'UserPaging'
  data: Array<User>
  meta: PagingMeta
}

export enum UserRole {
  Admin = 'Admin',
  User = 'User',
}

export enum UserStatus {
  Active = 'Active',
  Created = 'Created',
  Inactive = 'Inactive',
}

export type UserUpdateUserInput = {
  avatarUrl?: InputMaybe<Scalars['String']['input']>
  developer?: InputMaybe<Scalars['Boolean']['input']>
  name?: InputMaybe<Scalars['String']['input']>
}

export type VerifyIdentityChallengeInput = {
  challenge: Scalars['String']['input']
  provider: IdentityProvider
  providerId: Scalars['String']['input']
  signature: Scalars['String']['input']
  useLedger?: InputMaybe<Scalars['Boolean']['input']>
}

export type AssetDetailsFragment = {
  __typename?: 'Asset'
  account?: string | null
  attributeMap?: any | null
  createdAt: Date
  id: string
  image?: string | null
  owner?: string | null
  metadata?: any | null
  name: string
  network?: NetworkType | null
  symbol?: string | null
  updatedAt: Date
  raw?: any | null
  attributes?: Array<{
    __typename?: 'AssetAttribute'
    id?: string | null
    createdAt?: Date | null
    updatedAt?: Date | null
    key: string
    value: string
    count?: number | null
  }> | null
}

export type AssetAttributeDetailsFragment = {
  __typename?: 'AssetAttribute'
  id?: string | null
  createdAt?: Date | null
  updatedAt?: Date | null
  key: string
  value: string
  count?: number | null
}

export type AdminFindManyAssetQueryVariables = Exact<{
  input: AdminFindManyAssetInput
}>

export type AdminFindManyAssetQuery = {
  __typename?: 'Query'
  paging: {
    __typename?: 'AssetPaging'
    data: Array<{
      __typename?: 'Asset'
      account?: string | null
      attributeMap?: any | null
      createdAt: Date
      id: string
      image?: string | null
      owner?: string | null
      metadata?: any | null
      name: string
      network?: NetworkType | null
      symbol?: string | null
      updatedAt: Date
      raw?: any | null
      identity?: {
        __typename?: 'Identity'
        createdAt: Date
        expired?: boolean | null
        id: string
        profile?: any | null
        provider: IdentityProvider
        providerId: string
        updatedAt: Date
        verified?: boolean | null
        owner?: {
          __typename?: 'User'
          avatarUrl?: string | null
          createdAt?: Date | null
          developer?: boolean | null
          id: string
          name?: string | null
          profileUrl?: string | null
          role?: UserRole | null
          status?: UserStatus | null
          updatedAt?: Date | null
          username?: string | null
        } | null
      } | null
      attributes?: Array<{
        __typename?: 'AssetAttribute'
        id?: string | null
        createdAt?: Date | null
        updatedAt?: Date | null
        key: string
        value: string
        count?: number | null
      }> | null
    }>
    meta: {
      __typename?: 'PagingMeta'
      currentPage: number
      isFirstPage: boolean
      isLastPage: boolean
      nextPage?: number | null
      pageCount?: number | null
      previousPage?: number | null
      totalCount?: number | null
    }
  }
}

export type AdminFindOneAssetQueryVariables = Exact<{
  assetId: Scalars['String']['input']
}>

export type AdminFindOneAssetQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'Asset'
    account?: string | null
    attributeMap?: any | null
    createdAt: Date
    id: string
    image?: string | null
    owner?: string | null
    metadata?: any | null
    name: string
    network?: NetworkType | null
    symbol?: string | null
    updatedAt: Date
    raw?: any | null
    attributes?: Array<{
      __typename?: 'AssetAttribute'
      id?: string | null
      createdAt?: Date | null
      updatedAt?: Date | null
      key: string
      value: string
      count?: number | null
    }> | null
  } | null
}

export type AdminDeleteAssetMutationVariables = Exact<{
  assetId: Scalars['String']['input']
}>

export type AdminDeleteAssetMutation = { __typename?: 'Mutation'; deleted?: boolean | null }

export type UserFindManyAssetQueryVariables = Exact<{
  input: UserFindManyAssetInput
}>

export type UserFindManyAssetQuery = {
  __typename?: 'Query'
  paging: {
    __typename?: 'AssetPaging'
    data: Array<{
      __typename?: 'Asset'
      account?: string | null
      attributeMap?: any | null
      createdAt: Date
      id: string
      image?: string | null
      owner?: string | null
      metadata?: any | null
      name: string
      network?: NetworkType | null
      symbol?: string | null
      updatedAt: Date
      raw?: any | null
      collection?: {
        __typename?: 'Collection'
        createdAt: Date
        account?: string | null
        id: string
        name: string
        imageUrl?: string | null
        metadataUrl?: string | null
        description?: string | null
        enableSync?: boolean | null
        symbol?: string | null
        network?: NetworkType | null
        vaultId?: string | null
        updatedAt: Date
        assetCount?: number | null
        combos?: Array<{
          __typename?: 'CollectionCombo'
          createdAt: Date
          id: string
          name: string
          network?: NetworkType | null
          collectionAccount?: string | null
          updatedAt: Date
          attributes?: Array<{
            __typename?: 'AssetAttribute'
            id?: string | null
            createdAt?: Date | null
            updatedAt?: Date | null
            key: string
            value: string
            count?: number | null
          }> | null
        }> | null
      } | null
      identity?: {
        __typename?: 'Identity'
        createdAt: Date
        expired?: boolean | null
        id: string
        profile?: any | null
        provider: IdentityProvider
        providerId: string
        updatedAt: Date
        verified?: boolean | null
        owner?: {
          __typename?: 'User'
          avatarUrl?: string | null
          createdAt?: Date | null
          developer?: boolean | null
          id: string
          name?: string | null
          profileUrl?: string | null
          role?: UserRole | null
          status?: UserStatus | null
          updatedAt?: Date | null
          username?: string | null
        } | null
      } | null
      attributes?: Array<{
        __typename?: 'AssetAttribute'
        id?: string | null
        createdAt?: Date | null
        updatedAt?: Date | null
        key: string
        value: string
        count?: number | null
      }> | null
    }>
    meta: {
      __typename?: 'PagingMeta'
      currentPage: number
      isFirstPage: boolean
      isLastPage: boolean
      nextPage?: number | null
      pageCount?: number | null
      previousPage?: number | null
      totalCount?: number | null
    }
  }
}

export type UserFindOneAssetQueryVariables = Exact<{
  assetId: Scalars['String']['input']
}>

export type UserFindOneAssetQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'Asset'
    account?: string | null
    attributeMap?: any | null
    createdAt: Date
    id: string
    image?: string | null
    owner?: string | null
    metadata?: any | null
    name: string
    network?: NetworkType | null
    symbol?: string | null
    updatedAt: Date
    raw?: any | null
    collection?: {
      __typename?: 'Collection'
      createdAt: Date
      account?: string | null
      id: string
      name: string
      imageUrl?: string | null
      metadataUrl?: string | null
      description?: string | null
      enableSync?: boolean | null
      symbol?: string | null
      network?: NetworkType | null
      vaultId?: string | null
      updatedAt: Date
      assetCount?: number | null
      combos?: Array<{
        __typename?: 'CollectionCombo'
        createdAt: Date
        id: string
        name: string
        network?: NetworkType | null
        collectionAccount?: string | null
        updatedAt: Date
        attributes?: Array<{
          __typename?: 'AssetAttribute'
          id?: string | null
          createdAt?: Date | null
          updatedAt?: Date | null
          key: string
          value: string
          count?: number | null
        }> | null
      }> | null
    } | null
    identity?: {
      __typename?: 'Identity'
      createdAt: Date
      expired?: boolean | null
      id: string
      profile?: any | null
      provider: IdentityProvider
      providerId: string
      updatedAt: Date
      verified?: boolean | null
      owner?: {
        __typename?: 'User'
        avatarUrl?: string | null
        createdAt?: Date | null
        developer?: boolean | null
        id: string
        name?: string | null
        profileUrl?: string | null
        role?: UserRole | null
        status?: UserStatus | null
        updatedAt?: Date | null
        username?: string | null
      } | null
    } | null
    attributes?: Array<{
      __typename?: 'AssetAttribute'
      id?: string | null
      createdAt?: Date | null
      updatedAt?: Date | null
      key: string
      value: string
      count?: number | null
    }> | null
  } | null
}

export type LoginMutationVariables = Exact<{
  input: LoginInput
}>

export type LoginMutation = {
  __typename?: 'Mutation'
  login?: {
    __typename?: 'User'
    avatarUrl?: string | null
    createdAt?: Date | null
    developer?: boolean | null
    id: string
    name?: string | null
    profileUrl?: string | null
    role?: UserRole | null
    status?: UserStatus | null
    updatedAt?: Date | null
    username?: string | null
  } | null
}

export type LogoutMutationVariables = Exact<{ [key: string]: never }>

export type LogoutMutation = { __typename?: 'Mutation'; logout?: boolean | null }

export type RegisterMutationVariables = Exact<{
  input: RegisterInput
}>

export type RegisterMutation = {
  __typename?: 'Mutation'
  register?: {
    __typename?: 'User'
    avatarUrl?: string | null
    createdAt?: Date | null
    developer?: boolean | null
    id: string
    name?: string | null
    profileUrl?: string | null
    role?: UserRole | null
    status?: UserStatus | null
    updatedAt?: Date | null
    username?: string | null
  } | null
}

export type MeQueryVariables = Exact<{ [key: string]: never }>

export type MeQuery = {
  __typename?: 'Query'
  me?: {
    __typename?: 'User'
    avatarUrl?: string | null
    createdAt?: Date | null
    developer?: boolean | null
    id: string
    name?: string | null
    profileUrl?: string | null
    role?: UserRole | null
    status?: UserStatus | null
    updatedAt?: Date | null
    username?: string | null
  } | null
}

export type AdminCreateBackupMutationVariables = Exact<{ [key: string]: never }>

export type AdminCreateBackupMutation = { __typename?: 'Mutation'; created: boolean }

export type AdminDeleteBackupMutationVariables = Exact<{
  name: Scalars['String']['input']
}>

export type AdminDeleteBackupMutation = { __typename?: 'Mutation'; deleted: boolean }

export type AdminFetchBackupMutationVariables = Exact<{
  url: Scalars['String']['input']
}>

export type AdminFetchBackupMutation = { __typename?: 'Mutation'; fetched: boolean }

export type AdminGetBackupQueryVariables = Exact<{
  name: Scalars['String']['input']
}>

export type AdminGetBackupQuery = { __typename?: 'Query'; item?: any | null }

export type AdminGetBackupsQueryVariables = Exact<{ [key: string]: never }>

export type AdminGetBackupsQuery = { __typename?: 'Query'; items: Array<string> }

export type AdminRestoreBackupMutationVariables = Exact<{
  name: Scalars['String']['input']
}>

export type AdminRestoreBackupMutation = { __typename?: 'Mutation'; restored: boolean }

export type CollectionComboDetailsFragment = {
  __typename?: 'CollectionCombo'
  createdAt: Date
  id: string
  name: string
  network?: NetworkType | null
  collectionAccount?: string | null
  updatedAt: Date
  attributes?: Array<{
    __typename?: 'AssetAttribute'
    id?: string | null
    createdAt?: Date | null
    updatedAt?: Date | null
    key: string
    value: string
    count?: number | null
  }> | null
}

export type AdminFindManyCollectionComboQueryVariables = Exact<{
  input: AdminFindManyCollectionComboInput
}>

export type AdminFindManyCollectionComboQuery = {
  __typename?: 'Query'
  paging: {
    __typename?: 'CollectionComboPaging'
    data: Array<{
      __typename?: 'CollectionCombo'
      createdAt: Date
      id: string
      name: string
      network?: NetworkType | null
      collectionAccount?: string | null
      updatedAt: Date
      attributes?: Array<{
        __typename?: 'AssetAttribute'
        id?: string | null
        createdAt?: Date | null
        updatedAt?: Date | null
        key: string
        value: string
        count?: number | null
      }> | null
    }>
    meta: {
      __typename?: 'PagingMeta'
      currentPage: number
      isFirstPage: boolean
      isLastPage: boolean
      nextPage?: number | null
      pageCount?: number | null
      previousPage?: number | null
      totalCount?: number | null
    }
  }
}

export type AdminFindOneCollectionComboQueryVariables = Exact<{
  collectionComboId: Scalars['String']['input']
}>

export type AdminFindOneCollectionComboQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'CollectionCombo'
    createdAt: Date
    id: string
    name: string
    network?: NetworkType | null
    collectionAccount?: string | null
    updatedAt: Date
    attributes?: Array<{
      __typename?: 'AssetAttribute'
      id?: string | null
      createdAt?: Date | null
      updatedAt?: Date | null
      key: string
      value: string
      count?: number | null
    }> | null
  } | null
}

export type AdminCreateCollectionComboMutationVariables = Exact<{
  input: AdminCreateCollectionComboInput
}>

export type AdminCreateCollectionComboMutation = {
  __typename?: 'Mutation'
  created?: {
    __typename?: 'CollectionCombo'
    createdAt: Date
    id: string
    name: string
    network?: NetworkType | null
    collectionAccount?: string | null
    updatedAt: Date
    attributes?: Array<{
      __typename?: 'AssetAttribute'
      id?: string | null
      createdAt?: Date | null
      updatedAt?: Date | null
      key: string
      value: string
      count?: number | null
    }> | null
  } | null
}

export type AdminUpdateCollectionComboMutationVariables = Exact<{
  collectionComboId: Scalars['String']['input']
  input: AdminUpdateCollectionComboInput
}>

export type AdminUpdateCollectionComboMutation = {
  __typename?: 'Mutation'
  updated?: {
    __typename?: 'CollectionCombo'
    createdAt: Date
    id: string
    name: string
    network?: NetworkType | null
    collectionAccount?: string | null
    updatedAt: Date
    attributes?: Array<{
      __typename?: 'AssetAttribute'
      id?: string | null
      createdAt?: Date | null
      updatedAt?: Date | null
      key: string
      value: string
      count?: number | null
    }> | null
  } | null
}

export type AdminDeleteCollectionComboMutationVariables = Exact<{
  collectionComboId: Scalars['String']['input']
}>

export type AdminDeleteCollectionComboMutation = { __typename?: 'Mutation'; deleted?: boolean | null }

export type AdminAddCollectionComboAttributeMutationVariables = Exact<{
  collectionComboId: Scalars['String']['input']
  input: AssetAttributeInput
}>

export type AdminAddCollectionComboAttributeMutation = {
  __typename?: 'Mutation'
  added?: {
    __typename?: 'CollectionCombo'
    createdAt: Date
    id: string
    name: string
    network?: NetworkType | null
    collectionAccount?: string | null
    updatedAt: Date
    attributes?: Array<{
      __typename?: 'AssetAttribute'
      id?: string | null
      createdAt?: Date | null
      updatedAt?: Date | null
      key: string
      value: string
      count?: number | null
    }> | null
  } | null
}

export type AdminRemoveCollectionComboAttributeMutationVariables = Exact<{
  collectionComboId: Scalars['String']['input']
  assetAttributeId: Scalars['String']['input']
}>

export type AdminRemoveCollectionComboAttributeMutation = {
  __typename?: 'Mutation'
  removed?: {
    __typename?: 'CollectionCombo'
    createdAt: Date
    id: string
    name: string
    network?: NetworkType | null
    collectionAccount?: string | null
    updatedAt: Date
    attributes?: Array<{
      __typename?: 'AssetAttribute'
      id?: string | null
      createdAt?: Date | null
      updatedAt?: Date | null
      key: string
      value: string
      count?: number | null
    }> | null
  } | null
}

export type AdminCreateDiscordRoleConditionMutationVariables = Exact<{
  roleId: Scalars['String']['input']
}>

export type AdminCreateDiscordRoleConditionMutation = { __typename?: 'Mutation'; added?: boolean | null }

export type AdminDeleteDiscordRoleConditionMutationVariables = Exact<{
  conditionId: Scalars['String']['input']
}>

export type AdminDeleteDiscordRoleConditionMutation = { __typename?: 'Mutation'; added?: boolean | null }

export type AdminAddDiscordRoleConditionCollectionMutationVariables = Exact<{
  conditionId: Scalars['String']['input']
  collectionId: Scalars['String']['input']
}>

export type AdminAddDiscordRoleConditionCollectionMutation = { __typename?: 'Mutation'; added?: boolean | null }

export type AdminAddDiscordRoleConditionComboMutationVariables = Exact<{
  conditionId: Scalars['String']['input']
  comboId: Scalars['String']['input']
}>

export type AdminAddDiscordRoleConditionComboMutation = { __typename?: 'Mutation'; added?: boolean | null }

export type AdminRemoveDiscordRoleConditionCollectionMutationVariables = Exact<{
  conditionId: Scalars['String']['input']
  collectionId: Scalars['String']['input']
}>

export type AdminRemoveDiscordRoleConditionCollectionMutation = { __typename?: 'Mutation'; added?: boolean | null }

export type AdminRemoveDiscordRoleConditionComboMutationVariables = Exact<{
  conditionId: Scalars['String']['input']
  comboId: Scalars['String']['input']
}>

export type AdminRemoveDiscordRoleConditionComboMutation = { __typename?: 'Mutation'; added?: boolean | null }

export type CollectionDetailsFragment = {
  __typename?: 'Collection'
  createdAt: Date
  account?: string | null
  id: string
  name: string
  imageUrl?: string | null
  metadataUrl?: string | null
  description?: string | null
  enableSync?: boolean | null
  symbol?: string | null
  network?: NetworkType | null
  vaultId?: string | null
  updatedAt: Date
  assetCount?: number | null
  combos?: Array<{
    __typename?: 'CollectionCombo'
    createdAt: Date
    id: string
    name: string
    network?: NetworkType | null
    collectionAccount?: string | null
    updatedAt: Date
    attributes?: Array<{
      __typename?: 'AssetAttribute'
      id?: string | null
      createdAt?: Date | null
      updatedAt?: Date | null
      key: string
      value: string
      count?: number | null
    }> | null
  }> | null
}

export type AdminFindManyCollectionQueryVariables = Exact<{
  input: AdminFindManyCollectionInput
}>

export type AdminFindManyCollectionQuery = {
  __typename?: 'Query'
  paging: {
    __typename?: 'CollectionPaging'
    data: Array<{
      __typename?: 'Collection'
      createdAt: Date
      account?: string | null
      id: string
      name: string
      imageUrl?: string | null
      metadataUrl?: string | null
      description?: string | null
      enableSync?: boolean | null
      symbol?: string | null
      network?: NetworkType | null
      vaultId?: string | null
      updatedAt: Date
      assetCount?: number | null
      combos?: Array<{
        __typename?: 'CollectionCombo'
        createdAt: Date
        id: string
        name: string
        network?: NetworkType | null
        collectionAccount?: string | null
        updatedAt: Date
        attributes?: Array<{
          __typename?: 'AssetAttribute'
          id?: string | null
          createdAt?: Date | null
          updatedAt?: Date | null
          key: string
          value: string
          count?: number | null
        }> | null
      }> | null
    }>
    meta: {
      __typename?: 'PagingMeta'
      currentPage: number
      isFirstPage: boolean
      isLastPage: boolean
      nextPage?: number | null
      pageCount?: number | null
      previousPage?: number | null
      totalCount?: number | null
    }
  }
}

export type AdminFindOneCollectionQueryVariables = Exact<{
  collectionId: Scalars['String']['input']
}>

export type AdminFindOneCollectionQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'Collection'
    createdAt: Date
    account?: string | null
    id: string
    name: string
    imageUrl?: string | null
    metadataUrl?: string | null
    description?: string | null
    enableSync?: boolean | null
    symbol?: string | null
    network?: NetworkType | null
    vaultId?: string | null
    updatedAt: Date
    assetCount?: number | null
    attributes?: Array<{
      __typename?: 'AssetAttribute'
      id?: string | null
      createdAt?: Date | null
      updatedAt?: Date | null
      key: string
      value: string
      count?: number | null
    }> | null
    combos?: Array<{
      __typename?: 'CollectionCombo'
      createdAt: Date
      id: string
      name: string
      network?: NetworkType | null
      collectionAccount?: string | null
      updatedAt: Date
      attributes?: Array<{
        __typename?: 'AssetAttribute'
        id?: string | null
        createdAt?: Date | null
        updatedAt?: Date | null
        key: string
        value: string
        count?: number | null
      }> | null
    }> | null
  } | null
}

export type AdminCreateCollectionMutationVariables = Exact<{
  input: AdminCreateCollectionInput
}>

export type AdminCreateCollectionMutation = {
  __typename?: 'Mutation'
  created?: {
    __typename?: 'Collection'
    createdAt: Date
    account?: string | null
    id: string
    name: string
    imageUrl?: string | null
    metadataUrl?: string | null
    description?: string | null
    enableSync?: boolean | null
    symbol?: string | null
    network?: NetworkType | null
    vaultId?: string | null
    updatedAt: Date
    assetCount?: number | null
    combos?: Array<{
      __typename?: 'CollectionCombo'
      createdAt: Date
      id: string
      name: string
      network?: NetworkType | null
      collectionAccount?: string | null
      updatedAt: Date
      attributes?: Array<{
        __typename?: 'AssetAttribute'
        id?: string | null
        createdAt?: Date | null
        updatedAt?: Date | null
        key: string
        value: string
        count?: number | null
      }> | null
    }> | null
  } | null
}

export type AdminUpdateCollectionMutationVariables = Exact<{
  collectionId: Scalars['String']['input']
  input: AdminUpdateCollectionInput
}>

export type AdminUpdateCollectionMutation = {
  __typename?: 'Mutation'
  updated?: {
    __typename?: 'Collection'
    createdAt: Date
    account?: string | null
    id: string
    name: string
    imageUrl?: string | null
    metadataUrl?: string | null
    description?: string | null
    enableSync?: boolean | null
    symbol?: string | null
    network?: NetworkType | null
    vaultId?: string | null
    updatedAt: Date
    assetCount?: number | null
    combos?: Array<{
      __typename?: 'CollectionCombo'
      createdAt: Date
      id: string
      name: string
      network?: NetworkType | null
      collectionAccount?: string | null
      updatedAt: Date
      attributes?: Array<{
        __typename?: 'AssetAttribute'
        id?: string | null
        createdAt?: Date | null
        updatedAt?: Date | null
        key: string
        value: string
        count?: number | null
      }> | null
    }> | null
  } | null
}

export type AdminDeleteCollectionMutationVariables = Exact<{
  collectionId: Scalars['String']['input']
}>

export type AdminDeleteCollectionMutation = { __typename?: 'Mutation'; deleted?: boolean | null }

export type AdminSyncCollectionMutationVariables = Exact<{
  collectionId: Scalars['String']['input']
}>

export type AdminSyncCollectionMutation = { __typename?: 'Mutation'; synced?: string | null }

export type UserFindManyCollectionQueryVariables = Exact<{
  input: UserFindManyCollectionInput
}>

export type UserFindManyCollectionQuery = {
  __typename?: 'Query'
  paging: {
    __typename?: 'CollectionPaging'
    data: Array<{
      __typename?: 'Collection'
      createdAt: Date
      account?: string | null
      id: string
      name: string
      imageUrl?: string | null
      metadataUrl?: string | null
      description?: string | null
      enableSync?: boolean | null
      symbol?: string | null
      network?: NetworkType | null
      vaultId?: string | null
      updatedAt: Date
      assetCount?: number | null
      combos?: Array<{
        __typename?: 'CollectionCombo'
        createdAt: Date
        id: string
        name: string
        network?: NetworkType | null
        collectionAccount?: string | null
        updatedAt: Date
        attributes?: Array<{
          __typename?: 'AssetAttribute'
          id?: string | null
          createdAt?: Date | null
          updatedAt?: Date | null
          key: string
          value: string
          count?: number | null
        }> | null
      }> | null
    }>
    meta: {
      __typename?: 'PagingMeta'
      currentPage: number
      isFirstPage: boolean
      isLastPage: boolean
      nextPage?: number | null
      pageCount?: number | null
      previousPage?: number | null
      totalCount?: number | null
    }
  }
}

export type UserFindOneCollectionQueryVariables = Exact<{
  collectionId: Scalars['String']['input']
}>

export type UserFindOneCollectionQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'Collection'
    createdAt: Date
    account?: string | null
    id: string
    name: string
    imageUrl?: string | null
    metadataUrl?: string | null
    description?: string | null
    enableSync?: boolean | null
    symbol?: string | null
    network?: NetworkType | null
    vaultId?: string | null
    updatedAt: Date
    assetCount?: number | null
    combos?: Array<{
      __typename?: 'CollectionCombo'
      createdAt: Date
      id: string
      name: string
      network?: NetworkType | null
      collectionAccount?: string | null
      updatedAt: Date
      attributes?: Array<{
        __typename?: 'AssetAttribute'
        id?: string | null
        createdAt?: Date | null
        updatedAt?: Date | null
        key: string
        value: string
        count?: number | null
      }> | null
    }> | null
  } | null
}

export type AppConfigDetailsFragment = {
  __typename?: 'AppConfig'
  authDiscordEnabled: boolean
  authPasswordEnabled: boolean
  authRegisterEnabled: boolean
}

export type PagingMetaDetailsFragment = {
  __typename?: 'PagingMeta'
  currentPage: number
  isFirstPage: boolean
  isLastPage: boolean
  nextPage?: number | null
  pageCount?: number | null
  previousPage?: number | null
  totalCount?: number | null
}

export type UptimeQueryVariables = Exact<{ [key: string]: never }>

export type UptimeQuery = { __typename?: 'Query'; uptime: number }

export type AppConfigQueryVariables = Exact<{ [key: string]: never }>

export type AppConfigQuery = {
  __typename?: 'Query'
  config: {
    __typename?: 'AppConfig'
    authDiscordEnabled: boolean
    authPasswordEnabled: boolean
    authRegisterEnabled: boolean
  }
}

export type AdminDevCheckAccountQueryVariables = Exact<{
  type: NetworkType
  address: Scalars['String']['input']
}>

export type AdminDevCheckAccountQuery = { __typename?: 'Query'; result?: any | null }

export type AdminDevCheckIdentityQueryVariables = Exact<{
  provider: IdentityProvider
  providerId: Scalars['String']['input']
}>

export type AdminDevCheckIdentityQuery = { __typename?: 'Query'; result?: any | null }

export type DiscordRoleConditionDetailsFragment = {
  __typename?: 'DiscordRoleCondition'
  id?: string | null
  collectionsAmount?: number | null
  combosAmount?: number | null
  collections?: Array<{
    __typename?: 'Collection'
    createdAt: Date
    account?: string | null
    id: string
    name: string
    imageUrl?: string | null
    metadataUrl?: string | null
    description?: string | null
    enableSync?: boolean | null
    symbol?: string | null
    network?: NetworkType | null
    vaultId?: string | null
    updatedAt: Date
    assetCount?: number | null
    combos?: Array<{
      __typename?: 'CollectionCombo'
      createdAt: Date
      id: string
      name: string
      network?: NetworkType | null
      collectionAccount?: string | null
      updatedAt: Date
      attributes?: Array<{
        __typename?: 'AssetAttribute'
        id?: string | null
        createdAt?: Date | null
        updatedAt?: Date | null
        key: string
        value: string
        count?: number | null
      }> | null
    }> | null
  }> | null
  combos?: Array<{
    __typename?: 'CollectionCombo'
    createdAt: Date
    id: string
    name: string
    network?: NetworkType | null
    collectionAccount?: string | null
    updatedAt: Date
    attributes?: Array<{
      __typename?: 'AssetAttribute'
      id?: string | null
      createdAt?: Date | null
      updatedAt?: Date | null
      key: string
      value: string
      count?: number | null
    }> | null
  }> | null
}

export type DiscordRoleDetailsFragment = {
  __typename?: 'DiscordRole'
  id: string
  name: string
  permissions?: string | null
  color?: number | null
  hoist?: boolean | null
  position?: number | null
  managed?: boolean | null
  mentionable?: boolean | null
  serverId?: string | null
  conditions?: Array<{
    __typename?: 'DiscordRoleCondition'
    id?: string | null
    collectionsAmount?: number | null
    combosAmount?: number | null
    collections?: Array<{
      __typename?: 'Collection'
      createdAt: Date
      account?: string | null
      id: string
      name: string
      imageUrl?: string | null
      metadataUrl?: string | null
      description?: string | null
      enableSync?: boolean | null
      symbol?: string | null
      network?: NetworkType | null
      vaultId?: string | null
      updatedAt: Date
      assetCount?: number | null
      combos?: Array<{
        __typename?: 'CollectionCombo'
        createdAt: Date
        id: string
        name: string
        network?: NetworkType | null
        collectionAccount?: string | null
        updatedAt: Date
        attributes?: Array<{
          __typename?: 'AssetAttribute'
          id?: string | null
          createdAt?: Date | null
          updatedAt?: Date | null
          key: string
          value: string
          count?: number | null
        }> | null
      }> | null
    }> | null
    combos?: Array<{
      __typename?: 'CollectionCombo'
      createdAt: Date
      id: string
      name: string
      network?: NetworkType | null
      collectionAccount?: string | null
      updatedAt: Date
      attributes?: Array<{
        __typename?: 'AssetAttribute'
        id?: string | null
        createdAt?: Date | null
        updatedAt?: Date | null
        key: string
        value: string
        count?: number | null
      }> | null
    }> | null
  }> | null
}

export type AdminSyncDiscordRolesMutationVariables = Exact<{
  serverId: Scalars['String']['input']
}>

export type AdminSyncDiscordRolesMutation = { __typename?: 'Mutation'; adminSyncDiscordRoles?: boolean | null }

export type AdminCreateDiscordRoleMutationVariables = Exact<{
  input: AdminCreateDiscordRoleInput
}>

export type AdminCreateDiscordRoleMutation = { __typename?: 'Mutation'; created?: boolean | null }

export type AdminDeleteDiscordRoleMutationVariables = Exact<{
  input: AdminDeleteDiscordRoleInput
}>

export type AdminDeleteDiscordRoleMutation = { __typename?: 'Mutation'; deleted?: boolean | null }

export type DiscordServerChannelDetailsFragment = {
  __typename?: 'DiscordServerChannel'
  id: string
  name: string
  type: string
}

export type DiscordServerDetailsFragment = {
  __typename?: 'DiscordServer'
  features?: Array<string> | null
  icon?: string | null
  iconUrl?: string | null
  id: string
  name?: string | null
  owner?: boolean | null
  adminIds?: Array<string> | null
  enabled: boolean
  enableSync: boolean
  botChannel?: string | null
  permissions?: string | null
  serverUrl?: string | null
}

export type AdminGetBotInviteUrlQueryVariables = Exact<{ [key: string]: never }>

export type AdminGetBotInviteUrlQuery = { __typename?: 'Query'; url?: string | null }

export type AdminFindOneDiscordServerQueryVariables = Exact<{
  serverId: Scalars['String']['input']
}>

export type AdminFindOneDiscordServerQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'DiscordServer'
    features?: Array<string> | null
    icon?: string | null
    iconUrl?: string | null
    id: string
    name?: string | null
    owner?: boolean | null
    adminIds?: Array<string> | null
    enabled: boolean
    enableSync: boolean
    botChannel?: string | null
    permissions?: string | null
    serverUrl?: string | null
    roles?: Array<{
      __typename?: 'DiscordRole'
      id: string
      name: string
      permissions?: string | null
      color?: number | null
      hoist?: boolean | null
      position?: number | null
      managed?: boolean | null
      mentionable?: boolean | null
      serverId?: string | null
      conditions?: Array<{
        __typename?: 'DiscordRoleCondition'
        id?: string | null
        collectionsAmount?: number | null
        combosAmount?: number | null
        collections?: Array<{
          __typename?: 'Collection'
          createdAt: Date
          account?: string | null
          id: string
          name: string
          imageUrl?: string | null
          metadataUrl?: string | null
          description?: string | null
          enableSync?: boolean | null
          symbol?: string | null
          network?: NetworkType | null
          vaultId?: string | null
          updatedAt: Date
          assetCount?: number | null
          combos?: Array<{
            __typename?: 'CollectionCombo'
            createdAt: Date
            id: string
            name: string
            network?: NetworkType | null
            collectionAccount?: string | null
            updatedAt: Date
            attributes?: Array<{
              __typename?: 'AssetAttribute'
              id?: string | null
              createdAt?: Date | null
              updatedAt?: Date | null
              key: string
              value: string
              count?: number | null
            }> | null
          }> | null
        }> | null
        combos?: Array<{
          __typename?: 'CollectionCombo'
          createdAt: Date
          id: string
          name: string
          network?: NetworkType | null
          collectionAccount?: string | null
          updatedAt: Date
          attributes?: Array<{
            __typename?: 'AssetAttribute'
            id?: string | null
            createdAt?: Date | null
            updatedAt?: Date | null
            key: string
            value: string
            count?: number | null
          }> | null
        }> | null
      }> | null
    }> | null
  } | null
}

export type AdminFindManyDiscordServerChannelQueryVariables = Exact<{
  serverId: Scalars['String']['input']
}>

export type AdminFindManyDiscordServerChannelQuery = {
  __typename?: 'Query'
  items?: Array<{ __typename?: 'DiscordServerChannel'; id: string; name: string; type: string }> | null
}

export type AdminFindManyDiscordServerQueryVariables = Exact<{
  input: AdminFindManyDiscordServerInput
}>

export type AdminFindManyDiscordServerQuery = {
  __typename?: 'Query'
  paging: {
    __typename?: 'DiscordServerPaging'
    data: Array<{
      __typename?: 'DiscordServer'
      features?: Array<string> | null
      icon?: string | null
      iconUrl?: string | null
      id: string
      name?: string | null
      owner?: boolean | null
      adminIds?: Array<string> | null
      enabled: boolean
      enableSync: boolean
      botChannel?: string | null
      permissions?: string | null
      serverUrl?: string | null
    }>
    meta: {
      __typename?: 'PagingMeta'
      currentPage: number
      isFirstPage: boolean
      isLastPage: boolean
      nextPage?: number | null
      pageCount?: number | null
      previousPage?: number | null
      totalCount?: number | null
    }
  }
}

export type AdminTestDiscordServerBotChannelMutationVariables = Exact<{
  serverId: Scalars['String']['input']
}>

export type AdminTestDiscordServerBotChannelMutation = {
  __typename?: 'Mutation'
  adminTestDiscordServerBotChannel?: boolean | null
}

export type AdminDeleteDiscordServerMutationVariables = Exact<{
  serverId: Scalars['String']['input']
}>

export type AdminDeleteDiscordServerMutation = { __typename?: 'Mutation'; deleted?: boolean | null }

export type AdminUpdateDiscordServerMutationVariables = Exact<{
  serverId: Scalars['String']['input']
  input: AdminUpdateDiscordServerInput
}>

export type AdminUpdateDiscordServerMutation = {
  __typename?: 'Mutation'
  updated?: {
    __typename?: 'DiscordServer'
    features?: Array<string> | null
    icon?: string | null
    iconUrl?: string | null
    id: string
    name?: string | null
    owner?: boolean | null
    adminIds?: Array<string> | null
    enabled: boolean
    enableSync: boolean
    botChannel?: string | null
    permissions?: string | null
    serverUrl?: string | null
  } | null
}

export type UserFindManyDiscordServerQueryVariables = Exact<{ [key: string]: never }>

export type UserFindManyDiscordServerQuery = {
  __typename?: 'Query'
  items?: Array<{
    __typename?: 'DiscordServer'
    features?: Array<string> | null
    icon?: string | null
    iconUrl?: string | null
    id: string
    name?: string | null
    owner?: boolean | null
    adminIds?: Array<string> | null
    enabled: boolean
    enableSync: boolean
    botChannel?: string | null
    permissions?: string | null
    serverUrl?: string | null
    roles?: Array<{
      __typename?: 'DiscordRole'
      id: string
      name: string
      permissions?: string | null
      color?: number | null
      hoist?: boolean | null
      position?: number | null
      managed?: boolean | null
      mentionable?: boolean | null
      serverId?: string | null
      conditions?: Array<{
        __typename?: 'DiscordRoleCondition'
        id?: string | null
        collectionsAmount?: number | null
        combosAmount?: number | null
        collections?: Array<{
          __typename?: 'Collection'
          createdAt: Date
          account?: string | null
          id: string
          name: string
          imageUrl?: string | null
          metadataUrl?: string | null
          description?: string | null
          enableSync?: boolean | null
          symbol?: string | null
          network?: NetworkType | null
          vaultId?: string | null
          updatedAt: Date
          assetCount?: number | null
          combos?: Array<{
            __typename?: 'CollectionCombo'
            createdAt: Date
            id: string
            name: string
            network?: NetworkType | null
            collectionAccount?: string | null
            updatedAt: Date
            attributes?: Array<{
              __typename?: 'AssetAttribute'
              id?: string | null
              createdAt?: Date | null
              updatedAt?: Date | null
              key: string
              value: string
              count?: number | null
            }> | null
          }> | null
        }> | null
        combos?: Array<{
          __typename?: 'CollectionCombo'
          createdAt: Date
          id: string
          name: string
          network?: NetworkType | null
          collectionAccount?: string | null
          updatedAt: Date
          attributes?: Array<{
            __typename?: 'AssetAttribute'
            id?: string | null
            createdAt?: Date | null
            updatedAt?: Date | null
            key: string
            value: string
            count?: number | null
          }> | null
        }> | null
      }> | null
    }> | null
  }> | null
}

export type EmailDetailsFragment = {
  __typename?: 'Email'
  createdAt: Date
  default?: boolean | null
  email: string
  id: string
  private?: boolean | null
  updatedAt: Date
  verified?: boolean | null
}

export type AdminFindEmailsQueryVariables = Exact<{
  input: AdminFindEmailsInput
}>

export type AdminFindEmailsQuery = {
  __typename?: 'Query'
  items?: Array<{
    __typename?: 'Email'
    createdAt: Date
    default?: boolean | null
    email: string
    id: string
    private?: boolean | null
    updatedAt: Date
    verified?: boolean | null
  }> | null
}

export type AdminCreateEmailMutationVariables = Exact<{
  input: AdminCreateEmailInput
}>

export type AdminCreateEmailMutation = {
  __typename?: 'Mutation'
  created?: {
    __typename?: 'Email'
    createdAt: Date
    default?: boolean | null
    email: string
    id: string
    private?: boolean | null
    updatedAt: Date
    verified?: boolean | null
  } | null
}

export type AdminUpdateEmailMutationVariables = Exact<{
  emailId: Scalars['String']['input']
  input: AdminUpdateEmailInput
}>

export type AdminUpdateEmailMutation = {
  __typename?: 'Mutation'
  updated?: {
    __typename?: 'Email'
    createdAt: Date
    default?: boolean | null
    email: string
    id: string
    private?: boolean | null
    updatedAt: Date
    verified?: boolean | null
  } | null
}

export type AdminDeleteEmailMutationVariables = Exact<{
  emailId: Scalars['String']['input']
}>

export type AdminDeleteEmailMutation = { __typename?: 'Mutation'; deleted?: boolean | null }

export type IdentityDetailsFragment = {
  __typename?: 'Identity'
  createdAt: Date
  expired?: boolean | null
  id: string
  profile?: any | null
  provider: IdentityProvider
  providerId: string
  updatedAt: Date
  verified?: boolean | null
}

export type IdentityChallengeDetailsFragment = {
  __typename?: 'IdentityChallenge'
  id: string
  createdAt: Date
  updatedAt: Date
  provider: IdentityProvider
  providerId: string
  challenge: string
  signature?: string | null
  ip: string
  userAgent: string
  verified: boolean
}

export type AdminFindManyIdentityQueryVariables = Exact<{
  input: AdminFindManyIdentityInput
}>

export type AdminFindManyIdentityQuery = {
  __typename?: 'Query'
  items?: Array<{
    __typename?: 'Identity'
    createdAt: Date
    expired?: boolean | null
    id: string
    profile?: any | null
    provider: IdentityProvider
    providerId: string
    updatedAt: Date
    verified?: boolean | null
    challenges?: Array<{
      __typename?: 'IdentityChallenge'
      id: string
      createdAt: Date
      updatedAt: Date
      provider: IdentityProvider
      providerId: string
      challenge: string
      signature?: string | null
      ip: string
      userAgent: string
      verified: boolean
    }> | null
    owner?: {
      __typename?: 'User'
      avatarUrl?: string | null
      createdAt?: Date | null
      developer?: boolean | null
      id: string
      name?: string | null
      profileUrl?: string | null
      role?: UserRole | null
      status?: UserStatus | null
      updatedAt?: Date | null
      username?: string | null
    } | null
  }> | null
}

export type AdminCreateIdentityMutationVariables = Exact<{
  input: AdminCreateIdentityInput
}>

export type AdminCreateIdentityMutation = {
  __typename?: 'Mutation'
  created?: {
    __typename?: 'Identity'
    createdAt: Date
    expired?: boolean | null
    id: string
    profile?: any | null
    provider: IdentityProvider
    providerId: string
    updatedAt: Date
    verified?: boolean | null
  } | null
}

export type AdminDeleteIdentityMutationVariables = Exact<{
  identityId: Scalars['String']['input']
}>

export type AdminDeleteIdentityMutation = { __typename?: 'Mutation'; deleted?: boolean | null }

export type UserFindManyIdentityQueryVariables = Exact<{ [key: string]: never }>

export type UserFindManyIdentityQuery = {
  __typename?: 'Query'
  items?: Array<{
    __typename?: 'Identity'
    createdAt: Date
    expired?: boolean | null
    id: string
    profile?: any | null
    provider: IdentityProvider
    providerId: string
    updatedAt: Date
    verified?: boolean | null
  }> | null
}

export type UserDeleteIdentityMutationVariables = Exact<{
  identityId: Scalars['String']['input']
}>

export type UserDeleteIdentityMutation = { __typename?: 'Mutation'; deleted?: boolean | null }

export type UserRequestIdentityChallengeQueryVariables = Exact<{
  input: RequestIdentityChallengeInput
}>

export type UserRequestIdentityChallengeQuery = {
  __typename?: 'Query'
  challenge?: {
    __typename?: 'IdentityChallenge'
    id: string
    createdAt: Date
    updatedAt: Date
    provider: IdentityProvider
    providerId: string
    challenge: string
    signature?: string | null
    ip: string
    userAgent: string
    verified: boolean
  } | null
}

export type UserVerifyIdentityChallengeMutationVariables = Exact<{
  input: VerifyIdentityChallengeInput
}>

export type UserVerifyIdentityChallengeMutation = {
  __typename?: 'Mutation'
  verified?: {
    __typename?: 'IdentityChallenge'
    id: string
    createdAt: Date
    updatedAt: Date
    provider: IdentityProvider
    providerId: string
    challenge: string
    signature?: string | null
    ip: string
    userAgent: string
    verified: boolean
  } | null
}

export type UserLinkIdentityMutationVariables = Exact<{
  input: LinkIdentityInput
}>

export type UserLinkIdentityMutation = {
  __typename?: 'Mutation'
  linked?: {
    __typename?: 'Identity'
    createdAt: Date
    expired?: boolean | null
    id: string
    profile?: any | null
    provider: IdentityProvider
    providerId: string
    updatedAt: Date
    verified?: boolean | null
  } | null
}

export type NetworkDetailsFragment = {
  __typename?: 'Network'
  createdAt: Date
  endpoint?: string | null
  id: string
  name: string
  type?: NetworkType | null
  updatedAt: Date
}

export type NetworkTokenDetailsFragment = {
  __typename?: 'NetworkToken'
  id: string
  createdAt: Date
  updatedAt: Date
  address: string
  decimals?: number | null
  name: string
  price?: number | null
  priceDate?: Date | null
  symbol: string
  network?: NetworkType | null
}

export type AdminFindManyNetworkQueryVariables = Exact<{
  input: AdminFindManyNetworkInput
}>

export type AdminFindManyNetworkQuery = {
  __typename?: 'Query'
  paging: {
    __typename?: 'NetworkPaging'
    data: Array<{
      __typename?: 'Network'
      createdAt: Date
      endpoint?: string | null
      id: string
      name: string
      type?: NetworkType | null
      updatedAt: Date
    }>
    meta: {
      __typename?: 'PagingMeta'
      currentPage: number
      isFirstPage: boolean
      isLastPage: boolean
      nextPage?: number | null
      pageCount?: number | null
      previousPage?: number | null
      totalCount?: number | null
    }
  }
}

export type AdminFindOneNetworkQueryVariables = Exact<{
  networkId: Scalars['String']['input']
}>

export type AdminFindOneNetworkQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'Network'
    createdAt: Date
    endpoint?: string | null
    id: string
    name: string
    type?: NetworkType | null
    updatedAt: Date
    collections?: Array<{
      __typename?: 'Collection'
      createdAt: Date
      account?: string | null
      id: string
      name: string
      imageUrl?: string | null
      metadataUrl?: string | null
      description?: string | null
      enableSync?: boolean | null
      symbol?: string | null
      network?: NetworkType | null
      vaultId?: string | null
      updatedAt: Date
      assetCount?: number | null
      combos?: Array<{
        __typename?: 'CollectionCombo'
        createdAt: Date
        id: string
        name: string
        network?: NetworkType | null
        collectionAccount?: string | null
        updatedAt: Date
        attributes?: Array<{
          __typename?: 'AssetAttribute'
          id?: string | null
          createdAt?: Date | null
          updatedAt?: Date | null
          key: string
          value: string
          count?: number | null
        }> | null
      }> | null
    }> | null
    tokens?: Array<{
      __typename?: 'NetworkToken'
      id: string
      createdAt: Date
      updatedAt: Date
      address: string
      decimals?: number | null
      name: string
      price?: number | null
      priceDate?: Date | null
      symbol: string
      network?: NetworkType | null
    }> | null
  } | null
}

export type AdminSearchNetworkAssetQueryVariables = Exact<{
  networkId: Scalars['String']['input']
  mint: Scalars['String']['input']
}>

export type AdminSearchNetworkAssetQuery = { __typename?: 'Query'; item?: any | null }

export type AdminCreateNetworkMutationVariables = Exact<{
  input: AdminCreateNetworkInput
}>

export type AdminCreateNetworkMutation = {
  __typename?: 'Mutation'
  created?: {
    __typename?: 'Network'
    createdAt: Date
    endpoint?: string | null
    id: string
    name: string
    type?: NetworkType | null
    updatedAt: Date
  } | null
}

export type AdminCreateNetworkTokenMutationVariables = Exact<{
  input: AdminCreateNetworkTokenInput
}>

export type AdminCreateNetworkTokenMutation = {
  __typename?: 'Mutation'
  created?: {
    __typename?: 'NetworkToken'
    id: string
    createdAt: Date
    updatedAt: Date
    address: string
    decimals?: number | null
    name: string
    price?: number | null
    priceDate?: Date | null
    symbol: string
    network?: NetworkType | null
  } | null
}

export type AdminUpdateNetworkMutationVariables = Exact<{
  networkId: Scalars['String']['input']
  input: AdminUpdateNetworkInput
}>

export type AdminUpdateNetworkMutation = {
  __typename?: 'Mutation'
  updated?: {
    __typename?: 'Network'
    createdAt: Date
    endpoint?: string | null
    id: string
    name: string
    type?: NetworkType | null
    updatedAt: Date
  } | null
}

export type AdminDeleteNetworkMutationVariables = Exact<{
  networkId: Scalars['String']['input']
}>

export type AdminDeleteNetworkMutation = { __typename?: 'Mutation'; deleted?: boolean | null }

export type AdminDeleteNetworkTokenMutationVariables = Exact<{
  networkTokenId: Scalars['String']['input']
}>

export type AdminDeleteNetworkTokenMutation = { __typename?: 'Mutation'; deleted?: boolean | null }

export type QueueDetailsFragment = {
  __typename?: 'Queue'
  type: QueueType
  name: string
  info?: any | null
  isPaused?: boolean | null
  count?: {
    __typename?: 'QueueCount'
    active?: number | null
    completed?: number | null
    delayed?: number | null
    failed?: number | null
    paused?: number | null
    waiting?: number | null
  } | null
}

export type QueueCountDetailsFragment = {
  __typename?: 'QueueCount'
  active?: number | null
  completed?: number | null
  delayed?: number | null
  failed?: number | null
  paused?: number | null
  waiting?: number | null
}

export type JobDetailsFragment = {
  __typename?: 'Job'
  id?: string | null
  data?: any | null
  duration?: number | null
  opts?: any | null
  attemptsMade?: number | null
  processedOn?: Date | null
  finishedOn?: Date | null
  timestamp?: Date | null
  name?: string | null
  stacktrace?: Array<string> | null
  returnvalue?: any | null
  failedReason?: string | null
}

export type AdminGetQueuesQueryVariables = Exact<{ [key: string]: never }>

export type AdminGetQueuesQuery = {
  __typename?: 'Query'
  items?: Array<{
    __typename?: 'Queue'
    type: QueueType
    name: string
    info?: any | null
    isPaused?: boolean | null
    count?: {
      __typename?: 'QueueCount'
      active?: number | null
      completed?: number | null
      delayed?: number | null
      failed?: number | null
      paused?: number | null
      waiting?: number | null
    } | null
  }> | null
}

export type AdminGetQueueQueryVariables = Exact<{
  type: QueueType
}>

export type AdminGetQueueQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'Queue'
    type: QueueType
    name: string
    info?: any | null
    isPaused?: boolean | null
    count?: {
      __typename?: 'QueueCount'
      active?: number | null
      completed?: number | null
      delayed?: number | null
      failed?: number | null
      paused?: number | null
      waiting?: number | null
    } | null
  } | null
}

export type AdminGetQueueJobsQueryVariables = Exact<{
  type: QueueType
  statuses: Array<JobStatus> | JobStatus
}>

export type AdminGetQueueJobsQuery = {
  __typename?: 'Query'
  items?: Array<{
    __typename?: 'Job'
    id?: string | null
    data?: any | null
    duration?: number | null
    opts?: any | null
    attemptsMade?: number | null
    processedOn?: Date | null
    finishedOn?: Date | null
    timestamp?: Date | null
    name?: string | null
    stacktrace?: Array<string> | null
    returnvalue?: any | null
    failedReason?: string | null
  }> | null
}

export type AdminCleanQueueMutationVariables = Exact<{
  type: QueueType
}>

export type AdminCleanQueueMutation = { __typename?: 'Mutation'; paused?: boolean | null }

export type AdminDeleteQueueJobMutationVariables = Exact<{
  type: QueueType
  jobId: Scalars['String']['input']
}>

export type AdminDeleteQueueJobMutation = { __typename?: 'Mutation'; paused?: boolean | null }

export type AdminPauseQueueMutationVariables = Exact<{
  type: QueueType
}>

export type AdminPauseQueueMutation = { __typename?: 'Mutation'; paused?: boolean | null }

export type AdminResumeQueueMutationVariables = Exact<{
  type: QueueType
}>

export type AdminResumeQueueMutation = { __typename?: 'Mutation'; resumed?: boolean | null }

export type AdminReportDiscordMemberWalletsQueryVariables = Exact<{
  input: AdminReportDiscordMemberWalletsInput
}>

export type AdminReportDiscordMemberWalletsQuery = { __typename?: 'Query'; report?: any | null }

export type UserDetailsFragment = {
  __typename?: 'User'
  avatarUrl?: string | null
  createdAt?: Date | null
  developer?: boolean | null
  id: string
  name?: string | null
  profileUrl?: string | null
  role?: UserRole | null
  status?: UserStatus | null
  updatedAt?: Date | null
  username?: string | null
}

export type AdminFindManyUserQueryVariables = Exact<{
  input: AdminFindManyUserInput
}>

export type AdminFindManyUserQuery = {
  __typename?: 'Query'
  paging: {
    __typename?: 'UserPaging'
    data: Array<{
      __typename?: 'User'
      avatarUrl?: string | null
      createdAt?: Date | null
      developer?: boolean | null
      id: string
      name?: string | null
      profileUrl?: string | null
      role?: UserRole | null
      status?: UserStatus | null
      updatedAt?: Date | null
      username?: string | null
    }>
    meta: {
      __typename?: 'PagingMeta'
      currentPage: number
      isFirstPage: boolean
      isLastPage: boolean
      nextPage?: number | null
      pageCount?: number | null
      previousPage?: number | null
      totalCount?: number | null
    }
  }
}

export type AdminFindOneUserQueryVariables = Exact<{
  userId: Scalars['String']['input']
}>

export type AdminFindOneUserQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'User'
    avatarUrl?: string | null
    createdAt?: Date | null
    developer?: boolean | null
    id: string
    name?: string | null
    profileUrl?: string | null
    role?: UserRole | null
    status?: UserStatus | null
    updatedAt?: Date | null
    username?: string | null
  } | null
}

export type AdminCreateUserMutationVariables = Exact<{
  input: AdminCreateUserInput
}>

export type AdminCreateUserMutation = {
  __typename?: 'Mutation'
  created?: {
    __typename?: 'User'
    avatarUrl?: string | null
    createdAt?: Date | null
    developer?: boolean | null
    id: string
    name?: string | null
    profileUrl?: string | null
    role?: UserRole | null
    status?: UserStatus | null
    updatedAt?: Date | null
    username?: string | null
  } | null
}

export type AdminUpdateUserMutationVariables = Exact<{
  userId: Scalars['String']['input']
  input: AdminUpdateUserInput
}>

export type AdminUpdateUserMutation = {
  __typename?: 'Mutation'
  updated?: {
    __typename?: 'User'
    avatarUrl?: string | null
    createdAt?: Date | null
    developer?: boolean | null
    id: string
    name?: string | null
    profileUrl?: string | null
    role?: UserRole | null
    status?: UserStatus | null
    updatedAt?: Date | null
    username?: string | null
  } | null
}

export type AdminDeleteUserMutationVariables = Exact<{
  userId: Scalars['String']['input']
}>

export type AdminDeleteUserMutation = { __typename?: 'Mutation'; deleted?: boolean | null }

export type UserFindManyUserQueryVariables = Exact<{
  input: UserFindManyUserInput
}>

export type UserFindManyUserQuery = {
  __typename?: 'Query'
  paging: {
    __typename?: 'UserPaging'
    data: Array<{
      __typename?: 'User'
      avatarUrl?: string | null
      createdAt?: Date | null
      developer?: boolean | null
      id: string
      name?: string | null
      profileUrl?: string | null
      role?: UserRole | null
      status?: UserStatus | null
      updatedAt?: Date | null
      username?: string | null
    }>
    meta: {
      __typename?: 'PagingMeta'
      currentPage: number
      isFirstPage: boolean
      isLastPage: boolean
      nextPage?: number | null
      pageCount?: number | null
      previousPage?: number | null
      totalCount?: number | null
    }
  }
}

export type UserFindOneUserQueryVariables = Exact<{
  username: Scalars['String']['input']
}>

export type UserFindOneUserQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'User'
    avatarUrl?: string | null
    createdAt?: Date | null
    developer?: boolean | null
    id: string
    name?: string | null
    profileUrl?: string | null
    role?: UserRole | null
    status?: UserStatus | null
    updatedAt?: Date | null
    username?: string | null
  } | null
}

export type UserUpdateUserMutationVariables = Exact<{
  input: UserUpdateUserInput
}>

export type UserUpdateUserMutation = {
  __typename?: 'Mutation'
  updated?: {
    __typename?: 'User'
    avatarUrl?: string | null
    createdAt?: Date | null
    developer?: boolean | null
    id: string
    name?: string | null
    profileUrl?: string | null
    role?: UserRole | null
    status?: UserStatus | null
    updatedAt?: Date | null
    username?: string | null
  } | null
}

export const AssetAttributeDetailsFragmentDoc = gql`
  fragment AssetAttributeDetails on AssetAttribute {
    id
    createdAt
    updatedAt
    key
    value
    count
  }
`
export const AssetDetailsFragmentDoc = gql`
  fragment AssetDetails on Asset {
    account
    attributeMap
    attributes {
      ...AssetAttributeDetails
    }
    createdAt
    id
    image
    owner
    metadata
    name
    network
    symbol
    updatedAt
    raw
  }
  ${AssetAttributeDetailsFragmentDoc}
`
export const AppConfigDetailsFragmentDoc = gql`
  fragment AppConfigDetails on AppConfig {
    authDiscordEnabled
    authPasswordEnabled
    authRegisterEnabled
  }
`
export const PagingMetaDetailsFragmentDoc = gql`
  fragment PagingMetaDetails on PagingMeta {
    currentPage
    isFirstPage
    isLastPage
    nextPage
    pageCount
    previousPage
    totalCount
  }
`
export const CollectionComboDetailsFragmentDoc = gql`
  fragment CollectionComboDetails on CollectionCombo {
    createdAt
    id
    name
    network
    collectionAccount
    updatedAt
    attributes {
      ...AssetAttributeDetails
    }
  }
  ${AssetAttributeDetailsFragmentDoc}
`
export const CollectionDetailsFragmentDoc = gql`
  fragment CollectionDetails on Collection {
    createdAt
    account
    id
    name
    imageUrl
    metadataUrl
    description
    enableSync
    symbol
    network
    vaultId
    updatedAt
    assetCount
    combos {
      ...CollectionComboDetails
    }
  }
  ${CollectionComboDetailsFragmentDoc}
`
export const DiscordRoleConditionDetailsFragmentDoc = gql`
  fragment DiscordRoleConditionDetails on DiscordRoleCondition {
    id
    collectionsAmount
    collections {
      ...CollectionDetails
      combos {
        ...CollectionComboDetails
      }
    }
    combosAmount
    combos {
      ...CollectionComboDetails
    }
  }
  ${CollectionDetailsFragmentDoc}
  ${CollectionComboDetailsFragmentDoc}
`
export const DiscordRoleDetailsFragmentDoc = gql`
  fragment DiscordRoleDetails on DiscordRole {
    id
    name
    permissions
    color
    hoist
    position
    managed
    mentionable
    serverId
    conditions {
      ...DiscordRoleConditionDetails
    }
  }
  ${DiscordRoleConditionDetailsFragmentDoc}
`
export const DiscordServerChannelDetailsFragmentDoc = gql`
  fragment DiscordServerChannelDetails on DiscordServerChannel {
    id
    name
    type
  }
`
export const DiscordServerDetailsFragmentDoc = gql`
  fragment DiscordServerDetails on DiscordServer {
    features
    icon
    iconUrl
    id
    name
    owner
    adminIds
    enabled
    enableSync
    botChannel
    permissions
    serverUrl
  }
`
export const EmailDetailsFragmentDoc = gql`
  fragment EmailDetails on Email {
    createdAt
    default
    email
    id
    private
    updatedAt
    verified
  }
`
export const IdentityDetailsFragmentDoc = gql`
  fragment IdentityDetails on Identity {
    createdAt
    expired
    id
    profile
    provider
    providerId
    updatedAt
    verified
  }
`
export const IdentityChallengeDetailsFragmentDoc = gql`
  fragment IdentityChallengeDetails on IdentityChallenge {
    id
    createdAt
    updatedAt
    provider
    providerId
    challenge
    signature
    ip
    userAgent
    verified
  }
`
export const NetworkDetailsFragmentDoc = gql`
  fragment NetworkDetails on Network {
    createdAt
    endpoint
    id
    name
    type
    updatedAt
  }
`
export const NetworkTokenDetailsFragmentDoc = gql`
  fragment NetworkTokenDetails on NetworkToken {
    id
    createdAt
    updatedAt
    address
    decimals
    name
    price
    priceDate
    symbol
    network
  }
`
export const QueueCountDetailsFragmentDoc = gql`
  fragment QueueCountDetails on QueueCount {
    active
    completed
    delayed
    failed
    paused
    waiting
  }
`
export const QueueDetailsFragmentDoc = gql`
  fragment QueueDetails on Queue {
    type
    name
    count {
      ...QueueCountDetails
    }
    info
    isPaused
  }
  ${QueueCountDetailsFragmentDoc}
`
export const JobDetailsFragmentDoc = gql`
  fragment JobDetails on Job {
    id
    data
    duration
    opts
    attemptsMade
    processedOn
    finishedOn
    timestamp
    name
    stacktrace
    returnvalue
    failedReason
  }
`
export const UserDetailsFragmentDoc = gql`
  fragment UserDetails on User {
    avatarUrl
    createdAt
    developer
    id
    name
    profileUrl
    role
    status
    updatedAt
    username
  }
`
export const AdminFindManyAssetDocument = gql`
  query adminFindManyAsset($input: AdminFindManyAssetInput!) {
    paging: adminFindManyAsset(input: $input) {
      data {
        ...AssetDetails
        identity {
          ...IdentityDetails
          owner {
            ...UserDetails
          }
        }
      }
      meta {
        ...PagingMetaDetails
      }
    }
  }
  ${AssetDetailsFragmentDoc}
  ${IdentityDetailsFragmentDoc}
  ${UserDetailsFragmentDoc}
  ${PagingMetaDetailsFragmentDoc}
`
export const AdminFindOneAssetDocument = gql`
  query adminFindOneAsset($assetId: String!) {
    item: adminFindOneAsset(assetId: $assetId) {
      ...AssetDetails
    }
  }
  ${AssetDetailsFragmentDoc}
`
export const AdminDeleteAssetDocument = gql`
  mutation adminDeleteAsset($assetId: String!) {
    deleted: adminDeleteAsset(assetId: $assetId)
  }
`
export const UserFindManyAssetDocument = gql`
  query userFindManyAsset($input: UserFindManyAssetInput!) {
    paging: userFindManyAsset(input: $input) {
      data {
        ...AssetDetails
        collection {
          ...CollectionDetails
        }
        identity {
          ...IdentityDetails
          owner {
            ...UserDetails
          }
        }
      }
      meta {
        ...PagingMetaDetails
      }
    }
  }
  ${AssetDetailsFragmentDoc}
  ${CollectionDetailsFragmentDoc}
  ${IdentityDetailsFragmentDoc}
  ${UserDetailsFragmentDoc}
  ${PagingMetaDetailsFragmentDoc}
`
export const UserFindOneAssetDocument = gql`
  query userFindOneAsset($assetId: String!) {
    item: userFindOneAsset(assetId: $assetId) {
      ...AssetDetails
      collection {
        ...CollectionDetails
      }
      identity {
        ...IdentityDetails
        owner {
          ...UserDetails
        }
      }
    }
  }
  ${AssetDetailsFragmentDoc}
  ${CollectionDetailsFragmentDoc}
  ${IdentityDetailsFragmentDoc}
  ${UserDetailsFragmentDoc}
`
export const LoginDocument = gql`
  mutation login($input: LoginInput!) {
    login(input: $input) {
      ...UserDetails
    }
  }
  ${UserDetailsFragmentDoc}
`
export const LogoutDocument = gql`
  mutation logout {
    logout
  }
`
export const RegisterDocument = gql`
  mutation register($input: RegisterInput!) {
    register(input: $input) {
      ...UserDetails
    }
  }
  ${UserDetailsFragmentDoc}
`
export const MeDocument = gql`
  query me {
    me {
      ...UserDetails
    }
  }
  ${UserDetailsFragmentDoc}
`
export const AdminCreateBackupDocument = gql`
  mutation adminCreateBackup {
    created: adminCreateBackup
  }
`
export const AdminDeleteBackupDocument = gql`
  mutation adminDeleteBackup($name: String!) {
    deleted: adminDeleteBackup(name: $name)
  }
`
export const AdminFetchBackupDocument = gql`
  mutation adminFetchBackup($url: String!) {
    fetched: adminFetchBackup(url: $url)
  }
`
export const AdminGetBackupDocument = gql`
  query adminGetBackup($name: String!) {
    item: adminGetBackup(name: $name)
  }
`
export const AdminGetBackupsDocument = gql`
  query adminGetBackups {
    items: adminGetBackups
  }
`
export const AdminRestoreBackupDocument = gql`
  mutation adminRestoreBackup($name: String!) {
    restored: adminRestoreBackup(name: $name)
  }
`
export const AdminFindManyCollectionComboDocument = gql`
  query adminFindManyCollectionCombo($input: AdminFindManyCollectionComboInput!) {
    paging: adminFindManyCollectionCombo(input: $input) {
      data {
        ...CollectionComboDetails
      }
      meta {
        ...PagingMetaDetails
      }
    }
  }
  ${CollectionComboDetailsFragmentDoc}
  ${PagingMetaDetailsFragmentDoc}
`
export const AdminFindOneCollectionComboDocument = gql`
  query adminFindOneCollectionCombo($collectionComboId: String!) {
    item: adminFindOneCollectionCombo(collectionComboId: $collectionComboId) {
      ...CollectionComboDetails
    }
  }
  ${CollectionComboDetailsFragmentDoc}
`
export const AdminCreateCollectionComboDocument = gql`
  mutation adminCreateCollectionCombo($input: AdminCreateCollectionComboInput!) {
    created: adminCreateCollectionCombo(input: $input) {
      ...CollectionComboDetails
    }
  }
  ${CollectionComboDetailsFragmentDoc}
`
export const AdminUpdateCollectionComboDocument = gql`
  mutation adminUpdateCollectionCombo($collectionComboId: String!, $input: AdminUpdateCollectionComboInput!) {
    updated: adminUpdateCollectionCombo(collectionComboId: $collectionComboId, input: $input) {
      ...CollectionComboDetails
    }
  }
  ${CollectionComboDetailsFragmentDoc}
`
export const AdminDeleteCollectionComboDocument = gql`
  mutation adminDeleteCollectionCombo($collectionComboId: String!) {
    deleted: adminDeleteCollectionCombo(collectionComboId: $collectionComboId)
  }
`
export const AdminAddCollectionComboAttributeDocument = gql`
  mutation adminAddCollectionComboAttribute($collectionComboId: String!, $input: AssetAttributeInput!) {
    added: adminAddCollectionComboAttribute(collectionComboId: $collectionComboId, input: $input) {
      ...CollectionComboDetails
    }
  }
  ${CollectionComboDetailsFragmentDoc}
`
export const AdminRemoveCollectionComboAttributeDocument = gql`
  mutation adminRemoveCollectionComboAttribute($collectionComboId: String!, $assetAttributeId: String!) {
    removed: adminRemoveCollectionComboAttribute(
      collectionComboId: $collectionComboId
      assetAttributeId: $assetAttributeId
    ) {
      ...CollectionComboDetails
    }
  }
  ${CollectionComboDetailsFragmentDoc}
`
export const AdminCreateDiscordRoleConditionDocument = gql`
  mutation adminCreateDiscordRoleCondition($roleId: String!) {
    added: adminCreateDiscordRoleCondition(roleId: $roleId)
  }
`
export const AdminDeleteDiscordRoleConditionDocument = gql`
  mutation adminDeleteDiscordRoleCondition($conditionId: String!) {
    added: adminDeleteDiscordRoleCondition(conditionId: $conditionId)
  }
`
export const AdminAddDiscordRoleConditionCollectionDocument = gql`
  mutation adminAddDiscordRoleConditionCollection($conditionId: String!, $collectionId: String!) {
    added: adminAddDiscordRoleConditionCollection(conditionId: $conditionId, collectionId: $collectionId)
  }
`
export const AdminAddDiscordRoleConditionComboDocument = gql`
  mutation adminAddDiscordRoleConditionCombo($conditionId: String!, $comboId: String!) {
    added: adminAddDiscordRoleConditionCombo(conditionId: $conditionId, comboId: $comboId)
  }
`
export const AdminRemoveDiscordRoleConditionCollectionDocument = gql`
  mutation adminRemoveDiscordRoleConditionCollection($conditionId: String!, $collectionId: String!) {
    added: adminRemoveDiscordRoleConditionCollection(conditionId: $conditionId, collectionId: $collectionId)
  }
`
export const AdminRemoveDiscordRoleConditionComboDocument = gql`
  mutation adminRemoveDiscordRoleConditionCombo($conditionId: String!, $comboId: String!) {
    added: adminRemoveDiscordRoleConditionCombo(conditionId: $conditionId, comboId: $comboId)
  }
`
export const AdminFindManyCollectionDocument = gql`
  query adminFindManyCollection($input: AdminFindManyCollectionInput!) {
    paging: adminFindManyCollection(input: $input) {
      data {
        ...CollectionDetails
      }
      meta {
        ...PagingMetaDetails
      }
    }
  }
  ${CollectionDetailsFragmentDoc}
  ${PagingMetaDetailsFragmentDoc}
`
export const AdminFindOneCollectionDocument = gql`
  query adminFindOneCollection($collectionId: String!) {
    item: adminFindOneCollection(collectionId: $collectionId) {
      ...CollectionDetails
      attributes {
        ...AssetAttributeDetails
      }
    }
  }
  ${CollectionDetailsFragmentDoc}
  ${AssetAttributeDetailsFragmentDoc}
`
export const AdminCreateCollectionDocument = gql`
  mutation adminCreateCollection($input: AdminCreateCollectionInput!) {
    created: adminCreateCollection(input: $input) {
      ...CollectionDetails
    }
  }
  ${CollectionDetailsFragmentDoc}
`
export const AdminUpdateCollectionDocument = gql`
  mutation adminUpdateCollection($collectionId: String!, $input: AdminUpdateCollectionInput!) {
    updated: adminUpdateCollection(collectionId: $collectionId, input: $input) {
      ...CollectionDetails
    }
  }
  ${CollectionDetailsFragmentDoc}
`
export const AdminDeleteCollectionDocument = gql`
  mutation adminDeleteCollection($collectionId: String!) {
    deleted: adminDeleteCollection(collectionId: $collectionId)
  }
`
export const AdminSyncCollectionDocument = gql`
  mutation adminSyncCollection($collectionId: String!) {
    synced: adminSyncCollection(collectionId: $collectionId)
  }
`
export const UserFindManyCollectionDocument = gql`
  query userFindManyCollection($input: UserFindManyCollectionInput!) {
    paging: userFindManyCollection(input: $input) {
      data {
        ...CollectionDetails
      }
      meta {
        ...PagingMetaDetails
      }
    }
  }
  ${CollectionDetailsFragmentDoc}
  ${PagingMetaDetailsFragmentDoc}
`
export const UserFindOneCollectionDocument = gql`
  query userFindOneCollection($collectionId: String!) {
    item: userFindOneCollection(collectionId: $collectionId) {
      ...CollectionDetails
    }
  }
  ${CollectionDetailsFragmentDoc}
`
export const UptimeDocument = gql`
  query uptime {
    uptime
  }
`
export const AppConfigDocument = gql`
  query appConfig {
    config: appConfig {
      ...AppConfigDetails
    }
  }
  ${AppConfigDetailsFragmentDoc}
`
export const AdminDevCheckAccountDocument = gql`
  query adminDevCheckAccount($type: NetworkType!, $address: String!) {
    result: adminDevCheckAccount(type: $type, address: $address)
  }
`
export const AdminDevCheckIdentityDocument = gql`
  query adminDevCheckIdentity($provider: IdentityProvider!, $providerId: String!) {
    result: adminDevCheckIdentity(provider: $provider, providerId: $providerId)
  }
`
export const AdminSyncDiscordRolesDocument = gql`
  mutation adminSyncDiscordRoles($serverId: String!) {
    adminSyncDiscordRoles(serverId: $serverId)
  }
`
export const AdminCreateDiscordRoleDocument = gql`
  mutation adminCreateDiscordRole($input: AdminCreateDiscordRoleInput!) {
    created: adminCreateDiscordRole(input: $input)
  }
`
export const AdminDeleteDiscordRoleDocument = gql`
  mutation adminDeleteDiscordRole($input: AdminDeleteDiscordRoleInput!) {
    deleted: adminDeleteDiscordRole(input: $input)
  }
`
export const AdminGetBotInviteUrlDocument = gql`
  query adminGetBotInviteUrl {
    url: adminGetBotInviteUrl
  }
`
export const AdminFindOneDiscordServerDocument = gql`
  query adminFindOneDiscordServer($serverId: String!) {
    item: adminFindOneDiscordServer(serverId: $serverId) {
      ...DiscordServerDetails
      roles {
        ...DiscordRoleDetails
      }
    }
  }
  ${DiscordServerDetailsFragmentDoc}
  ${DiscordRoleDetailsFragmentDoc}
`
export const AdminFindManyDiscordServerChannelDocument = gql`
  query adminFindManyDiscordServerChannel($serverId: String!) {
    items: adminFindManyDiscordServerChannel(serverId: $serverId) {
      ...DiscordServerChannelDetails
    }
  }
  ${DiscordServerChannelDetailsFragmentDoc}
`
export const AdminFindManyDiscordServerDocument = gql`
  query adminFindManyDiscordServer($input: AdminFindManyDiscordServerInput!) {
    paging: adminFindManyDiscordServer(input: $input) {
      data {
        ...DiscordServerDetails
      }
      meta {
        ...PagingMetaDetails
      }
    }
  }
  ${DiscordServerDetailsFragmentDoc}
  ${PagingMetaDetailsFragmentDoc}
`
export const AdminTestDiscordServerBotChannelDocument = gql`
  mutation adminTestDiscordServerBotChannel($serverId: String!) {
    adminTestDiscordServerBotChannel(serverId: $serverId)
  }
`
export const AdminDeleteDiscordServerDocument = gql`
  mutation adminDeleteDiscordServer($serverId: String!) {
    deleted: adminDeleteDiscordServer(serverId: $serverId)
  }
`
export const AdminUpdateDiscordServerDocument = gql`
  mutation adminUpdateDiscordServer($serverId: String!, $input: AdminUpdateDiscordServerInput!) {
    updated: adminUpdateDiscordServer(serverId: $serverId, input: $input) {
      ...DiscordServerDetails
    }
  }
  ${DiscordServerDetailsFragmentDoc}
`
export const UserFindManyDiscordServerDocument = gql`
  query userFindManyDiscordServer {
    items: userFindManyDiscordServer {
      ...DiscordServerDetails
      roles {
        ...DiscordRoleDetails
        conditions {
          ...DiscordRoleConditionDetails
          collections {
            ...CollectionDetails
          }
          combos {
            ...CollectionComboDetails
          }
        }
      }
    }
  }
  ${DiscordServerDetailsFragmentDoc}
  ${DiscordRoleDetailsFragmentDoc}
  ${DiscordRoleConditionDetailsFragmentDoc}
  ${CollectionDetailsFragmentDoc}
  ${CollectionComboDetailsFragmentDoc}
`
export const AdminFindEmailsDocument = gql`
  query adminFindEmails($input: AdminFindEmailsInput!) {
    items: adminFindEmails(input: $input) {
      ...EmailDetails
    }
  }
  ${EmailDetailsFragmentDoc}
`
export const AdminCreateEmailDocument = gql`
  mutation adminCreateEmail($input: AdminCreateEmailInput!) {
    created: adminCreateEmail(input: $input) {
      ...EmailDetails
    }
  }
  ${EmailDetailsFragmentDoc}
`
export const AdminUpdateEmailDocument = gql`
  mutation adminUpdateEmail($emailId: String!, $input: AdminUpdateEmailInput!) {
    updated: adminUpdateEmail(emailId: $emailId, input: $input) {
      ...EmailDetails
    }
  }
  ${EmailDetailsFragmentDoc}
`
export const AdminDeleteEmailDocument = gql`
  mutation adminDeleteEmail($emailId: String!) {
    deleted: adminDeleteEmail(emailId: $emailId)
  }
`
export const AdminFindManyIdentityDocument = gql`
  query adminFindManyIdentity($input: AdminFindManyIdentityInput!) {
    items: adminFindManyIdentity(input: $input) {
      ...IdentityDetails
      challenges {
        ...IdentityChallengeDetails
      }
      owner {
        ...UserDetails
      }
    }
  }
  ${IdentityDetailsFragmentDoc}
  ${IdentityChallengeDetailsFragmentDoc}
  ${UserDetailsFragmentDoc}
`
export const AdminCreateIdentityDocument = gql`
  mutation adminCreateIdentity($input: AdminCreateIdentityInput!) {
    created: adminCreateIdentity(input: $input) {
      ...IdentityDetails
    }
  }
  ${IdentityDetailsFragmentDoc}
`
export const AdminDeleteIdentityDocument = gql`
  mutation adminDeleteIdentity($identityId: String!) {
    deleted: adminDeleteIdentity(identityId: $identityId)
  }
`
export const UserFindManyIdentityDocument = gql`
  query userFindManyIdentity {
    items: userFindManyIdentity {
      ...IdentityDetails
    }
  }
  ${IdentityDetailsFragmentDoc}
`
export const UserDeleteIdentityDocument = gql`
  mutation userDeleteIdentity($identityId: String!) {
    deleted: userDeleteIdentity(identityId: $identityId)
  }
`
export const UserRequestIdentityChallengeDocument = gql`
  query userRequestIdentityChallenge($input: RequestIdentityChallengeInput!) {
    challenge: userRequestIdentityChallenge(input: $input) {
      ...IdentityChallengeDetails
    }
  }
  ${IdentityChallengeDetailsFragmentDoc}
`
export const UserVerifyIdentityChallengeDocument = gql`
  mutation userVerifyIdentityChallenge($input: VerifyIdentityChallengeInput!) {
    verified: userVerifyIdentityChallenge(input: $input) {
      ...IdentityChallengeDetails
    }
  }
  ${IdentityChallengeDetailsFragmentDoc}
`
export const UserLinkIdentityDocument = gql`
  mutation userLinkIdentity($input: LinkIdentityInput!) {
    linked: userLinkIdentity(input: $input) {
      ...IdentityDetails
    }
  }
  ${IdentityDetailsFragmentDoc}
`
export const AdminFindManyNetworkDocument = gql`
  query adminFindManyNetwork($input: AdminFindManyNetworkInput!) {
    paging: adminFindManyNetwork(input: $input) {
      data {
        ...NetworkDetails
      }
      meta {
        ...PagingMetaDetails
      }
    }
  }
  ${NetworkDetailsFragmentDoc}
  ${PagingMetaDetailsFragmentDoc}
`
export const AdminFindOneNetworkDocument = gql`
  query adminFindOneNetwork($networkId: String!) {
    item: adminFindOneNetwork(networkId: $networkId) {
      ...NetworkDetails
      collections {
        ...CollectionDetails
      }
      tokens {
        ...NetworkTokenDetails
      }
    }
  }
  ${NetworkDetailsFragmentDoc}
  ${CollectionDetailsFragmentDoc}
  ${NetworkTokenDetailsFragmentDoc}
`
export const AdminSearchNetworkAssetDocument = gql`
  query adminSearchNetworkAsset($networkId: String!, $mint: String!) {
    item: adminSearchNetworkAsset(networkId: $networkId, mint: $mint)
  }
`
export const AdminCreateNetworkDocument = gql`
  mutation adminCreateNetwork($input: AdminCreateNetworkInput!) {
    created: adminCreateNetwork(input: $input) {
      ...NetworkDetails
    }
  }
  ${NetworkDetailsFragmentDoc}
`
export const AdminCreateNetworkTokenDocument = gql`
  mutation adminCreateNetworkToken($input: AdminCreateNetworkTokenInput!) {
    created: adminCreateNetworkToken(input: $input) {
      ...NetworkTokenDetails
    }
  }
  ${NetworkTokenDetailsFragmentDoc}
`
export const AdminUpdateNetworkDocument = gql`
  mutation adminUpdateNetwork($networkId: String!, $input: AdminUpdateNetworkInput!) {
    updated: adminUpdateNetwork(networkId: $networkId, input: $input) {
      ...NetworkDetails
    }
  }
  ${NetworkDetailsFragmentDoc}
`
export const AdminDeleteNetworkDocument = gql`
  mutation adminDeleteNetwork($networkId: String!) {
    deleted: adminDeleteNetwork(networkId: $networkId)
  }
`
export const AdminDeleteNetworkTokenDocument = gql`
  mutation adminDeleteNetworkToken($networkTokenId: String!) {
    deleted: adminDeleteNetworkToken(networkTokenId: $networkTokenId)
  }
`
export const AdminGetQueuesDocument = gql`
  query adminGetQueues {
    items: adminGetQueues {
      ...QueueDetails
    }
  }
  ${QueueDetailsFragmentDoc}
`
export const AdminGetQueueDocument = gql`
  query adminGetQueue($type: QueueType!) {
    item: adminGetQueue(type: $type) {
      ...QueueDetails
    }
  }
  ${QueueDetailsFragmentDoc}
`
export const AdminGetQueueJobsDocument = gql`
  query adminGetQueueJobs($type: QueueType!, $statuses: [JobStatus!]!) {
    items: adminGetQueueJobs(type: $type, statuses: $statuses) {
      ...JobDetails
    }
  }
  ${JobDetailsFragmentDoc}
`
export const AdminCleanQueueDocument = gql`
  mutation adminCleanQueue($type: QueueType!) {
    paused: adminCleanQueue(type: $type)
  }
`
export const AdminDeleteQueueJobDocument = gql`
  mutation adminDeleteQueueJob($type: QueueType!, $jobId: String!) {
    paused: adminDeleteQueueJob(type: $type, jobId: $jobId)
  }
`
export const AdminPauseQueueDocument = gql`
  mutation adminPauseQueue($type: QueueType!) {
    paused: adminPauseQueue(type: $type)
  }
`
export const AdminResumeQueueDocument = gql`
  mutation adminResumeQueue($type: QueueType!) {
    resumed: adminResumeQueue(type: $type)
  }
`
export const AdminReportDiscordMemberWalletsDocument = gql`
  query adminReportDiscordMemberWallets($input: AdminReportDiscordMemberWalletsInput!) {
    report: adminReportDiscordMemberWallets(input: $input)
  }
`
export const AdminFindManyUserDocument = gql`
  query adminFindManyUser($input: AdminFindManyUserInput!) {
    paging: adminFindManyUser(input: $input) {
      data {
        ...UserDetails
      }
      meta {
        ...PagingMetaDetails
      }
    }
  }
  ${UserDetailsFragmentDoc}
  ${PagingMetaDetailsFragmentDoc}
`
export const AdminFindOneUserDocument = gql`
  query adminFindOneUser($userId: String!) {
    item: adminFindOneUser(userId: $userId) {
      ...UserDetails
    }
  }
  ${UserDetailsFragmentDoc}
`
export const AdminCreateUserDocument = gql`
  mutation adminCreateUser($input: AdminCreateUserInput!) {
    created: adminCreateUser(input: $input) {
      ...UserDetails
    }
  }
  ${UserDetailsFragmentDoc}
`
export const AdminUpdateUserDocument = gql`
  mutation adminUpdateUser($userId: String!, $input: AdminUpdateUserInput!) {
    updated: adminUpdateUser(userId: $userId, input: $input) {
      ...UserDetails
    }
  }
  ${UserDetailsFragmentDoc}
`
export const AdminDeleteUserDocument = gql`
  mutation adminDeleteUser($userId: String!) {
    deleted: adminDeleteUser(userId: $userId)
  }
`
export const UserFindManyUserDocument = gql`
  query userFindManyUser($input: UserFindManyUserInput!) {
    paging: userFindManyUser(input: $input) {
      data {
        ...UserDetails
      }
      meta {
        ...PagingMetaDetails
      }
    }
  }
  ${UserDetailsFragmentDoc}
  ${PagingMetaDetailsFragmentDoc}
`
export const UserFindOneUserDocument = gql`
  query userFindOneUser($username: String!) {
    item: userFindOneUser(username: $username) {
      ...UserDetails
    }
  }
  ${UserDetailsFragmentDoc}
`
export const UserUpdateUserDocument = gql`
  mutation userUpdateUser($input: UserUpdateUserInput!) {
    updated: userUpdateUser(input: $input) {
      ...UserDetails
    }
  }
  ${UserDetailsFragmentDoc}
`

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
) => Promise<T>

const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action()
const AdminFindManyAssetDocumentString = print(AdminFindManyAssetDocument)
const AdminFindOneAssetDocumentString = print(AdminFindOneAssetDocument)
const AdminDeleteAssetDocumentString = print(AdminDeleteAssetDocument)
const UserFindManyAssetDocumentString = print(UserFindManyAssetDocument)
const UserFindOneAssetDocumentString = print(UserFindOneAssetDocument)
const LoginDocumentString = print(LoginDocument)
const LogoutDocumentString = print(LogoutDocument)
const RegisterDocumentString = print(RegisterDocument)
const MeDocumentString = print(MeDocument)
const AdminCreateBackupDocumentString = print(AdminCreateBackupDocument)
const AdminDeleteBackupDocumentString = print(AdminDeleteBackupDocument)
const AdminFetchBackupDocumentString = print(AdminFetchBackupDocument)
const AdminGetBackupDocumentString = print(AdminGetBackupDocument)
const AdminGetBackupsDocumentString = print(AdminGetBackupsDocument)
const AdminRestoreBackupDocumentString = print(AdminRestoreBackupDocument)
const AdminFindManyCollectionComboDocumentString = print(AdminFindManyCollectionComboDocument)
const AdminFindOneCollectionComboDocumentString = print(AdminFindOneCollectionComboDocument)
const AdminCreateCollectionComboDocumentString = print(AdminCreateCollectionComboDocument)
const AdminUpdateCollectionComboDocumentString = print(AdminUpdateCollectionComboDocument)
const AdminDeleteCollectionComboDocumentString = print(AdminDeleteCollectionComboDocument)
const AdminAddCollectionComboAttributeDocumentString = print(AdminAddCollectionComboAttributeDocument)
const AdminRemoveCollectionComboAttributeDocumentString = print(AdminRemoveCollectionComboAttributeDocument)
const AdminCreateDiscordRoleConditionDocumentString = print(AdminCreateDiscordRoleConditionDocument)
const AdminDeleteDiscordRoleConditionDocumentString = print(AdminDeleteDiscordRoleConditionDocument)
const AdminAddDiscordRoleConditionCollectionDocumentString = print(AdminAddDiscordRoleConditionCollectionDocument)
const AdminAddDiscordRoleConditionComboDocumentString = print(AdminAddDiscordRoleConditionComboDocument)
const AdminRemoveDiscordRoleConditionCollectionDocumentString = print(AdminRemoveDiscordRoleConditionCollectionDocument)
const AdminRemoveDiscordRoleConditionComboDocumentString = print(AdminRemoveDiscordRoleConditionComboDocument)
const AdminFindManyCollectionDocumentString = print(AdminFindManyCollectionDocument)
const AdminFindOneCollectionDocumentString = print(AdminFindOneCollectionDocument)
const AdminCreateCollectionDocumentString = print(AdminCreateCollectionDocument)
const AdminUpdateCollectionDocumentString = print(AdminUpdateCollectionDocument)
const AdminDeleteCollectionDocumentString = print(AdminDeleteCollectionDocument)
const AdminSyncCollectionDocumentString = print(AdminSyncCollectionDocument)
const UserFindManyCollectionDocumentString = print(UserFindManyCollectionDocument)
const UserFindOneCollectionDocumentString = print(UserFindOneCollectionDocument)
const UptimeDocumentString = print(UptimeDocument)
const AppConfigDocumentString = print(AppConfigDocument)
const AdminDevCheckAccountDocumentString = print(AdminDevCheckAccountDocument)
const AdminDevCheckIdentityDocumentString = print(AdminDevCheckIdentityDocument)
const AdminSyncDiscordRolesDocumentString = print(AdminSyncDiscordRolesDocument)
const AdminCreateDiscordRoleDocumentString = print(AdminCreateDiscordRoleDocument)
const AdminDeleteDiscordRoleDocumentString = print(AdminDeleteDiscordRoleDocument)
const AdminGetBotInviteUrlDocumentString = print(AdminGetBotInviteUrlDocument)
const AdminFindOneDiscordServerDocumentString = print(AdminFindOneDiscordServerDocument)
const AdminFindManyDiscordServerChannelDocumentString = print(AdminFindManyDiscordServerChannelDocument)
const AdminFindManyDiscordServerDocumentString = print(AdminFindManyDiscordServerDocument)
const AdminTestDiscordServerBotChannelDocumentString = print(AdminTestDiscordServerBotChannelDocument)
const AdminDeleteDiscordServerDocumentString = print(AdminDeleteDiscordServerDocument)
const AdminUpdateDiscordServerDocumentString = print(AdminUpdateDiscordServerDocument)
const UserFindManyDiscordServerDocumentString = print(UserFindManyDiscordServerDocument)
const AdminFindEmailsDocumentString = print(AdminFindEmailsDocument)
const AdminCreateEmailDocumentString = print(AdminCreateEmailDocument)
const AdminUpdateEmailDocumentString = print(AdminUpdateEmailDocument)
const AdminDeleteEmailDocumentString = print(AdminDeleteEmailDocument)
const AdminFindManyIdentityDocumentString = print(AdminFindManyIdentityDocument)
const AdminCreateIdentityDocumentString = print(AdminCreateIdentityDocument)
const AdminDeleteIdentityDocumentString = print(AdminDeleteIdentityDocument)
const UserFindManyIdentityDocumentString = print(UserFindManyIdentityDocument)
const UserDeleteIdentityDocumentString = print(UserDeleteIdentityDocument)
const UserRequestIdentityChallengeDocumentString = print(UserRequestIdentityChallengeDocument)
const UserVerifyIdentityChallengeDocumentString = print(UserVerifyIdentityChallengeDocument)
const UserLinkIdentityDocumentString = print(UserLinkIdentityDocument)
const AdminFindManyNetworkDocumentString = print(AdminFindManyNetworkDocument)
const AdminFindOneNetworkDocumentString = print(AdminFindOneNetworkDocument)
const AdminSearchNetworkAssetDocumentString = print(AdminSearchNetworkAssetDocument)
const AdminCreateNetworkDocumentString = print(AdminCreateNetworkDocument)
const AdminCreateNetworkTokenDocumentString = print(AdminCreateNetworkTokenDocument)
const AdminUpdateNetworkDocumentString = print(AdminUpdateNetworkDocument)
const AdminDeleteNetworkDocumentString = print(AdminDeleteNetworkDocument)
const AdminDeleteNetworkTokenDocumentString = print(AdminDeleteNetworkTokenDocument)
const AdminGetQueuesDocumentString = print(AdminGetQueuesDocument)
const AdminGetQueueDocumentString = print(AdminGetQueueDocument)
const AdminGetQueueJobsDocumentString = print(AdminGetQueueJobsDocument)
const AdminCleanQueueDocumentString = print(AdminCleanQueueDocument)
const AdminDeleteQueueJobDocumentString = print(AdminDeleteQueueJobDocument)
const AdminPauseQueueDocumentString = print(AdminPauseQueueDocument)
const AdminResumeQueueDocumentString = print(AdminResumeQueueDocument)
const AdminReportDiscordMemberWalletsDocumentString = print(AdminReportDiscordMemberWalletsDocument)
const AdminFindManyUserDocumentString = print(AdminFindManyUserDocument)
const AdminFindOneUserDocumentString = print(AdminFindOneUserDocument)
const AdminCreateUserDocumentString = print(AdminCreateUserDocument)
const AdminUpdateUserDocumentString = print(AdminUpdateUserDocument)
const AdminDeleteUserDocumentString = print(AdminDeleteUserDocument)
const UserFindManyUserDocumentString = print(UserFindManyUserDocument)
const UserFindOneUserDocumentString = print(UserFindOneUserDocument)
const UserUpdateUserDocumentString = print(UserUpdateUserDocument)
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    adminFindManyAsset(
      variables: AdminFindManyAssetQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminFindManyAssetQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminFindManyAssetQuery>(AdminFindManyAssetDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminFindManyAsset',
        'query',
      )
    },
    adminFindOneAsset(
      variables: AdminFindOneAssetQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminFindOneAssetQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminFindOneAssetQuery>(AdminFindOneAssetDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminFindOneAsset',
        'query',
      )
    },
    adminDeleteAsset(
      variables: AdminDeleteAssetMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminDeleteAssetMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminDeleteAssetMutation>(AdminDeleteAssetDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminDeleteAsset',
        'mutation',
      )
    },
    userFindManyAsset(
      variables: UserFindManyAssetQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserFindManyAssetQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserFindManyAssetQuery>(UserFindManyAssetDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userFindManyAsset',
        'query',
      )
    },
    userFindOneAsset(
      variables: UserFindOneAssetQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserFindOneAssetQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserFindOneAssetQuery>(UserFindOneAssetDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userFindOneAsset',
        'query',
      )
    },
    login(
      variables: LoginMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{ data: LoginMutation; errors?: GraphQLError[]; extensions?: any; headers: Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<LoginMutation>(LoginDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'login',
        'mutation',
      )
    },
    logout(
      variables?: LogoutMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{ data: LogoutMutation; errors?: GraphQLError[]; extensions?: any; headers: Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<LogoutMutation>(LogoutDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'logout',
        'mutation',
      )
    },
    register(
      variables: RegisterMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: RegisterMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<RegisterMutation>(RegisterDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'register',
        'mutation',
      )
    },
    me(
      variables?: MeQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{ data: MeQuery; errors?: GraphQLError[]; extensions?: any; headers: Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<MeQuery>(MeDocumentString, variables, { ...requestHeaders, ...wrappedRequestHeaders }),
        'me',
        'query',
      )
    },
    adminCreateBackup(
      variables?: AdminCreateBackupMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminCreateBackupMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminCreateBackupMutation>(AdminCreateBackupDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminCreateBackup',
        'mutation',
      )
    },
    adminDeleteBackup(
      variables: AdminDeleteBackupMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminDeleteBackupMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminDeleteBackupMutation>(AdminDeleteBackupDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminDeleteBackup',
        'mutation',
      )
    },
    adminFetchBackup(
      variables: AdminFetchBackupMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminFetchBackupMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminFetchBackupMutation>(AdminFetchBackupDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminFetchBackup',
        'mutation',
      )
    },
    adminGetBackup(
      variables: AdminGetBackupQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminGetBackupQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminGetBackupQuery>(AdminGetBackupDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminGetBackup',
        'query',
      )
    },
    adminGetBackups(
      variables?: AdminGetBackupsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminGetBackupsQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminGetBackupsQuery>(AdminGetBackupsDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminGetBackups',
        'query',
      )
    },
    adminRestoreBackup(
      variables: AdminRestoreBackupMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminRestoreBackupMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminRestoreBackupMutation>(AdminRestoreBackupDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminRestoreBackup',
        'mutation',
      )
    },
    adminFindManyCollectionCombo(
      variables: AdminFindManyCollectionComboQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminFindManyCollectionComboQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminFindManyCollectionComboQuery>(AdminFindManyCollectionComboDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminFindManyCollectionCombo',
        'query',
      )
    },
    adminFindOneCollectionCombo(
      variables: AdminFindOneCollectionComboQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminFindOneCollectionComboQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminFindOneCollectionComboQuery>(AdminFindOneCollectionComboDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminFindOneCollectionCombo',
        'query',
      )
    },
    adminCreateCollectionCombo(
      variables: AdminCreateCollectionComboMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminCreateCollectionComboMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminCreateCollectionComboMutation>(AdminCreateCollectionComboDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminCreateCollectionCombo',
        'mutation',
      )
    },
    adminUpdateCollectionCombo(
      variables: AdminUpdateCollectionComboMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminUpdateCollectionComboMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminUpdateCollectionComboMutation>(AdminUpdateCollectionComboDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminUpdateCollectionCombo',
        'mutation',
      )
    },
    adminDeleteCollectionCombo(
      variables: AdminDeleteCollectionComboMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminDeleteCollectionComboMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminDeleteCollectionComboMutation>(AdminDeleteCollectionComboDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminDeleteCollectionCombo',
        'mutation',
      )
    },
    adminAddCollectionComboAttribute(
      variables: AdminAddCollectionComboAttributeMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminAddCollectionComboAttributeMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminAddCollectionComboAttributeMutation>(
            AdminAddCollectionComboAttributeDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'adminAddCollectionComboAttribute',
        'mutation',
      )
    },
    adminRemoveCollectionComboAttribute(
      variables: AdminRemoveCollectionComboAttributeMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminRemoveCollectionComboAttributeMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminRemoveCollectionComboAttributeMutation>(
            AdminRemoveCollectionComboAttributeDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'adminRemoveCollectionComboAttribute',
        'mutation',
      )
    },
    adminCreateDiscordRoleCondition(
      variables: AdminCreateDiscordRoleConditionMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminCreateDiscordRoleConditionMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminCreateDiscordRoleConditionMutation>(
            AdminCreateDiscordRoleConditionDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'adminCreateDiscordRoleCondition',
        'mutation',
      )
    },
    adminDeleteDiscordRoleCondition(
      variables: AdminDeleteDiscordRoleConditionMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminDeleteDiscordRoleConditionMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminDeleteDiscordRoleConditionMutation>(
            AdminDeleteDiscordRoleConditionDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'adminDeleteDiscordRoleCondition',
        'mutation',
      )
    },
    adminAddDiscordRoleConditionCollection(
      variables: AdminAddDiscordRoleConditionCollectionMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminAddDiscordRoleConditionCollectionMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminAddDiscordRoleConditionCollectionMutation>(
            AdminAddDiscordRoleConditionCollectionDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'adminAddDiscordRoleConditionCollection',
        'mutation',
      )
    },
    adminAddDiscordRoleConditionCombo(
      variables: AdminAddDiscordRoleConditionComboMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminAddDiscordRoleConditionComboMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminAddDiscordRoleConditionComboMutation>(
            AdminAddDiscordRoleConditionComboDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'adminAddDiscordRoleConditionCombo',
        'mutation',
      )
    },
    adminRemoveDiscordRoleConditionCollection(
      variables: AdminRemoveDiscordRoleConditionCollectionMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminRemoveDiscordRoleConditionCollectionMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminRemoveDiscordRoleConditionCollectionMutation>(
            AdminRemoveDiscordRoleConditionCollectionDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'adminRemoveDiscordRoleConditionCollection',
        'mutation',
      )
    },
    adminRemoveDiscordRoleConditionCombo(
      variables: AdminRemoveDiscordRoleConditionComboMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminRemoveDiscordRoleConditionComboMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminRemoveDiscordRoleConditionComboMutation>(
            AdminRemoveDiscordRoleConditionComboDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'adminRemoveDiscordRoleConditionCombo',
        'mutation',
      )
    },
    adminFindManyCollection(
      variables: AdminFindManyCollectionQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminFindManyCollectionQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminFindManyCollectionQuery>(AdminFindManyCollectionDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminFindManyCollection',
        'query',
      )
    },
    adminFindOneCollection(
      variables: AdminFindOneCollectionQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminFindOneCollectionQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminFindOneCollectionQuery>(AdminFindOneCollectionDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminFindOneCollection',
        'query',
      )
    },
    adminCreateCollection(
      variables: AdminCreateCollectionMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminCreateCollectionMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminCreateCollectionMutation>(AdminCreateCollectionDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminCreateCollection',
        'mutation',
      )
    },
    adminUpdateCollection(
      variables: AdminUpdateCollectionMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminUpdateCollectionMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminUpdateCollectionMutation>(AdminUpdateCollectionDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminUpdateCollection',
        'mutation',
      )
    },
    adminDeleteCollection(
      variables: AdminDeleteCollectionMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminDeleteCollectionMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminDeleteCollectionMutation>(AdminDeleteCollectionDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminDeleteCollection',
        'mutation',
      )
    },
    adminSyncCollection(
      variables: AdminSyncCollectionMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminSyncCollectionMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminSyncCollectionMutation>(AdminSyncCollectionDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminSyncCollection',
        'mutation',
      )
    },
    userFindManyCollection(
      variables: UserFindManyCollectionQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserFindManyCollectionQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserFindManyCollectionQuery>(UserFindManyCollectionDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userFindManyCollection',
        'query',
      )
    },
    userFindOneCollection(
      variables: UserFindOneCollectionQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserFindOneCollectionQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserFindOneCollectionQuery>(UserFindOneCollectionDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userFindOneCollection',
        'query',
      )
    },
    uptime(
      variables?: UptimeQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{ data: UptimeQuery; errors?: GraphQLError[]; extensions?: any; headers: Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UptimeQuery>(UptimeDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'uptime',
        'query',
      )
    },
    appConfig(
      variables?: AppConfigQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{ data: AppConfigQuery; errors?: GraphQLError[]; extensions?: any; headers: Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AppConfigQuery>(AppConfigDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'appConfig',
        'query',
      )
    },
    adminDevCheckAccount(
      variables: AdminDevCheckAccountQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminDevCheckAccountQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminDevCheckAccountQuery>(AdminDevCheckAccountDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminDevCheckAccount',
        'query',
      )
    },
    adminDevCheckIdentity(
      variables: AdminDevCheckIdentityQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminDevCheckIdentityQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminDevCheckIdentityQuery>(AdminDevCheckIdentityDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminDevCheckIdentity',
        'query',
      )
    },
    adminSyncDiscordRoles(
      variables: AdminSyncDiscordRolesMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminSyncDiscordRolesMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminSyncDiscordRolesMutation>(AdminSyncDiscordRolesDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminSyncDiscordRoles',
        'mutation',
      )
    },
    adminCreateDiscordRole(
      variables: AdminCreateDiscordRoleMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminCreateDiscordRoleMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminCreateDiscordRoleMutation>(AdminCreateDiscordRoleDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminCreateDiscordRole',
        'mutation',
      )
    },
    adminDeleteDiscordRole(
      variables: AdminDeleteDiscordRoleMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminDeleteDiscordRoleMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminDeleteDiscordRoleMutation>(AdminDeleteDiscordRoleDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminDeleteDiscordRole',
        'mutation',
      )
    },
    adminGetBotInviteUrl(
      variables?: AdminGetBotInviteUrlQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminGetBotInviteUrlQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminGetBotInviteUrlQuery>(AdminGetBotInviteUrlDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminGetBotInviteUrl',
        'query',
      )
    },
    adminFindOneDiscordServer(
      variables: AdminFindOneDiscordServerQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminFindOneDiscordServerQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminFindOneDiscordServerQuery>(AdminFindOneDiscordServerDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminFindOneDiscordServer',
        'query',
      )
    },
    adminFindManyDiscordServerChannel(
      variables: AdminFindManyDiscordServerChannelQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminFindManyDiscordServerChannelQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminFindManyDiscordServerChannelQuery>(
            AdminFindManyDiscordServerChannelDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'adminFindManyDiscordServerChannel',
        'query',
      )
    },
    adminFindManyDiscordServer(
      variables: AdminFindManyDiscordServerQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminFindManyDiscordServerQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminFindManyDiscordServerQuery>(AdminFindManyDiscordServerDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminFindManyDiscordServer',
        'query',
      )
    },
    adminTestDiscordServerBotChannel(
      variables: AdminTestDiscordServerBotChannelMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminTestDiscordServerBotChannelMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminTestDiscordServerBotChannelMutation>(
            AdminTestDiscordServerBotChannelDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'adminTestDiscordServerBotChannel',
        'mutation',
      )
    },
    adminDeleteDiscordServer(
      variables: AdminDeleteDiscordServerMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminDeleteDiscordServerMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminDeleteDiscordServerMutation>(AdminDeleteDiscordServerDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminDeleteDiscordServer',
        'mutation',
      )
    },
    adminUpdateDiscordServer(
      variables: AdminUpdateDiscordServerMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminUpdateDiscordServerMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminUpdateDiscordServerMutation>(AdminUpdateDiscordServerDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminUpdateDiscordServer',
        'mutation',
      )
    },
    userFindManyDiscordServer(
      variables?: UserFindManyDiscordServerQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserFindManyDiscordServerQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserFindManyDiscordServerQuery>(UserFindManyDiscordServerDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userFindManyDiscordServer',
        'query',
      )
    },
    adminFindEmails(
      variables: AdminFindEmailsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminFindEmailsQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminFindEmailsQuery>(AdminFindEmailsDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminFindEmails',
        'query',
      )
    },
    adminCreateEmail(
      variables: AdminCreateEmailMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminCreateEmailMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminCreateEmailMutation>(AdminCreateEmailDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminCreateEmail',
        'mutation',
      )
    },
    adminUpdateEmail(
      variables: AdminUpdateEmailMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminUpdateEmailMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminUpdateEmailMutation>(AdminUpdateEmailDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminUpdateEmail',
        'mutation',
      )
    },
    adminDeleteEmail(
      variables: AdminDeleteEmailMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminDeleteEmailMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminDeleteEmailMutation>(AdminDeleteEmailDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminDeleteEmail',
        'mutation',
      )
    },
    adminFindManyIdentity(
      variables: AdminFindManyIdentityQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminFindManyIdentityQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminFindManyIdentityQuery>(AdminFindManyIdentityDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminFindManyIdentity',
        'query',
      )
    },
    adminCreateIdentity(
      variables: AdminCreateIdentityMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminCreateIdentityMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminCreateIdentityMutation>(AdminCreateIdentityDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminCreateIdentity',
        'mutation',
      )
    },
    adminDeleteIdentity(
      variables: AdminDeleteIdentityMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminDeleteIdentityMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminDeleteIdentityMutation>(AdminDeleteIdentityDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminDeleteIdentity',
        'mutation',
      )
    },
    userFindManyIdentity(
      variables?: UserFindManyIdentityQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserFindManyIdentityQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserFindManyIdentityQuery>(UserFindManyIdentityDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userFindManyIdentity',
        'query',
      )
    },
    userDeleteIdentity(
      variables: UserDeleteIdentityMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserDeleteIdentityMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserDeleteIdentityMutation>(UserDeleteIdentityDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userDeleteIdentity',
        'mutation',
      )
    },
    userRequestIdentityChallenge(
      variables: UserRequestIdentityChallengeQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserRequestIdentityChallengeQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserRequestIdentityChallengeQuery>(UserRequestIdentityChallengeDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userRequestIdentityChallenge',
        'query',
      )
    },
    userVerifyIdentityChallenge(
      variables: UserVerifyIdentityChallengeMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserVerifyIdentityChallengeMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserVerifyIdentityChallengeMutation>(UserVerifyIdentityChallengeDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userVerifyIdentityChallenge',
        'mutation',
      )
    },
    userLinkIdentity(
      variables: UserLinkIdentityMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserLinkIdentityMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserLinkIdentityMutation>(UserLinkIdentityDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userLinkIdentity',
        'mutation',
      )
    },
    adminFindManyNetwork(
      variables: AdminFindManyNetworkQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminFindManyNetworkQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminFindManyNetworkQuery>(AdminFindManyNetworkDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminFindManyNetwork',
        'query',
      )
    },
    adminFindOneNetwork(
      variables: AdminFindOneNetworkQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminFindOneNetworkQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminFindOneNetworkQuery>(AdminFindOneNetworkDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminFindOneNetwork',
        'query',
      )
    },
    adminSearchNetworkAsset(
      variables: AdminSearchNetworkAssetQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminSearchNetworkAssetQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminSearchNetworkAssetQuery>(AdminSearchNetworkAssetDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminSearchNetworkAsset',
        'query',
      )
    },
    adminCreateNetwork(
      variables: AdminCreateNetworkMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminCreateNetworkMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminCreateNetworkMutation>(AdminCreateNetworkDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminCreateNetwork',
        'mutation',
      )
    },
    adminCreateNetworkToken(
      variables: AdminCreateNetworkTokenMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminCreateNetworkTokenMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminCreateNetworkTokenMutation>(AdminCreateNetworkTokenDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminCreateNetworkToken',
        'mutation',
      )
    },
    adminUpdateNetwork(
      variables: AdminUpdateNetworkMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminUpdateNetworkMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminUpdateNetworkMutation>(AdminUpdateNetworkDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminUpdateNetwork',
        'mutation',
      )
    },
    adminDeleteNetwork(
      variables: AdminDeleteNetworkMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminDeleteNetworkMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminDeleteNetworkMutation>(AdminDeleteNetworkDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminDeleteNetwork',
        'mutation',
      )
    },
    adminDeleteNetworkToken(
      variables: AdminDeleteNetworkTokenMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminDeleteNetworkTokenMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminDeleteNetworkTokenMutation>(AdminDeleteNetworkTokenDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminDeleteNetworkToken',
        'mutation',
      )
    },
    adminGetQueues(
      variables?: AdminGetQueuesQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminGetQueuesQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminGetQueuesQuery>(AdminGetQueuesDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminGetQueues',
        'query',
      )
    },
    adminGetQueue(
      variables: AdminGetQueueQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminGetQueueQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminGetQueueQuery>(AdminGetQueueDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminGetQueue',
        'query',
      )
    },
    adminGetQueueJobs(
      variables: AdminGetQueueJobsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminGetQueueJobsQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminGetQueueJobsQuery>(AdminGetQueueJobsDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminGetQueueJobs',
        'query',
      )
    },
    adminCleanQueue(
      variables: AdminCleanQueueMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminCleanQueueMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminCleanQueueMutation>(AdminCleanQueueDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminCleanQueue',
        'mutation',
      )
    },
    adminDeleteQueueJob(
      variables: AdminDeleteQueueJobMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminDeleteQueueJobMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminDeleteQueueJobMutation>(AdminDeleteQueueJobDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminDeleteQueueJob',
        'mutation',
      )
    },
    adminPauseQueue(
      variables: AdminPauseQueueMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminPauseQueueMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminPauseQueueMutation>(AdminPauseQueueDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminPauseQueue',
        'mutation',
      )
    },
    adminResumeQueue(
      variables: AdminResumeQueueMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminResumeQueueMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminResumeQueueMutation>(AdminResumeQueueDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminResumeQueue',
        'mutation',
      )
    },
    adminReportDiscordMemberWallets(
      variables: AdminReportDiscordMemberWalletsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminReportDiscordMemberWalletsQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminReportDiscordMemberWalletsQuery>(
            AdminReportDiscordMemberWalletsDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'adminReportDiscordMemberWallets',
        'query',
      )
    },
    adminFindManyUser(
      variables: AdminFindManyUserQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminFindManyUserQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminFindManyUserQuery>(AdminFindManyUserDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminFindManyUser',
        'query',
      )
    },
    adminFindOneUser(
      variables: AdminFindOneUserQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminFindOneUserQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminFindOneUserQuery>(AdminFindOneUserDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminFindOneUser',
        'query',
      )
    },
    adminCreateUser(
      variables: AdminCreateUserMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminCreateUserMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminCreateUserMutation>(AdminCreateUserDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminCreateUser',
        'mutation',
      )
    },
    adminUpdateUser(
      variables: AdminUpdateUserMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminUpdateUserMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminUpdateUserMutation>(AdminUpdateUserDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminUpdateUser',
        'mutation',
      )
    },
    adminDeleteUser(
      variables: AdminDeleteUserMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: AdminDeleteUserMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminDeleteUserMutation>(AdminDeleteUserDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminDeleteUser',
        'mutation',
      )
    },
    userFindManyUser(
      variables: UserFindManyUserQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserFindManyUserQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserFindManyUserQuery>(UserFindManyUserDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userFindManyUser',
        'query',
      )
    },
    userFindOneUser(
      variables: UserFindOneUserQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserFindOneUserQuery
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserFindOneUserQuery>(UserFindOneUserDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userFindOneUser',
        'query',
      )
    },
    userUpdateUser(
      variables: UserUpdateUserMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders,
    ): Promise<{
      data: UserUpdateUserMutation
      errors?: GraphQLError[]
      extensions?: any
      headers: Headers
      status: number
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserUpdateUserMutation>(UserUpdateUserDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userUpdateUser',
        'mutation',
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
