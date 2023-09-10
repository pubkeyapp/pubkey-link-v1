// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import { print } from 'graphql'
import gql from 'graphql-tag'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: Date
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any
}

export type AdminCreateCollectionComboInput = {
  collectionId: Scalars['String']
  description?: InputMaybe<Scalars['String']>
  name: Scalars['String']
}

export type AdminCreateCollectionInput = {
  account: Scalars['String']
  network?: InputMaybe<NetworkType>
}

export type AdminCreateDiscordRoleInput = {
  name: Scalars['String']
  serverId: Scalars['String']
}

export type AdminCreateEmailInput = {
  email: Scalars['String']
  ownerId: Scalars['String']
}

export type AdminCreateIdentityInput = {
  ownerId: Scalars['String']
  provider: IdentityProvider
  providerId: Scalars['String']
}

export type AdminCreateNetworkInput = {
  endpoint: Scalars['String']
  name: Scalars['String']
  type?: InputMaybe<NetworkType>
}

export type AdminCreateNetworkTokenInput = {
  address: Scalars['String']
  decimals?: InputMaybe<Scalars['Int']>
  network?: InputMaybe<NetworkType>
  symbol: Scalars['String']
}

export type AdminCreateUserInput = {
  password?: InputMaybe<Scalars['String']>
  username: Scalars['String']
}

export type AdminDeleteDiscordRoleInput = {
  roleId: Scalars['String']
  serverId: Scalars['String']
}

export type AdminFindEmailsInput = {
  ownerId: Scalars['String']
}

export type AdminFindManyAssetInput = {
  collectionAccount?: InputMaybe<Scalars['String']>
  limit?: InputMaybe<Scalars['Int']>
  network?: InputMaybe<NetworkType>
  page?: InputMaybe<Scalars['Int']>
  search?: InputMaybe<Scalars['String']>
}

export type AdminFindManyCollectionComboInput = {
  collectionId: Scalars['String']
  limit?: InputMaybe<Scalars['Int']>
  network?: InputMaybe<NetworkType>
  page?: InputMaybe<Scalars['Int']>
  search?: InputMaybe<Scalars['String']>
}

export type AdminFindManyCollectionInput = {
  limit?: InputMaybe<Scalars['Int']>
  network?: InputMaybe<NetworkType>
  page?: InputMaybe<Scalars['Int']>
  search?: InputMaybe<Scalars['String']>
}

export type AdminFindManyDiscordServerInput = {
  limit?: InputMaybe<Scalars['Int']>
  page?: InputMaybe<Scalars['Int']>
  search?: InputMaybe<Scalars['String']>
}

export type AdminFindManyIdentityInput = {
  ownerId?: InputMaybe<Scalars['String']>
  provider?: InputMaybe<IdentityProvider>
}

export type AdminFindManyNetworkInput = {
  limit?: InputMaybe<Scalars['Int']>
  page?: InputMaybe<Scalars['Int']>
  search?: InputMaybe<Scalars['String']>
  type?: InputMaybe<NetworkType>
}

export type AdminFindManyUserInput = {
  limit?: InputMaybe<Scalars['Int']>
  page?: InputMaybe<Scalars['Int']>
  role?: InputMaybe<UserRole>
  search?: InputMaybe<Scalars['String']>
  status?: InputMaybe<UserStatus>
}

export type AdminReportDiscordMemberWalletsInput = {
  collectionAccount: Scalars['String']
  serverId: Scalars['String']
}

export type AdminUpdateCollectionComboInput = {
  description?: InputMaybe<Scalars['String']>
  name?: InputMaybe<Scalars['String']>
}

export type AdminUpdateCollectionInput = {
  account?: InputMaybe<Scalars['String']>
  description: Scalars['String']
  imageUrl: Scalars['String']
  metadataUrl: Scalars['String']
  name?: InputMaybe<Scalars['String']>
  symbol: Scalars['String']
  vaultId?: InputMaybe<Scalars['String']>
}

export type AdminUpdateDiscordServerInput = {
  botChannel?: InputMaybe<Scalars['String']>
  enableSync?: InputMaybe<Scalars['Boolean']>
}

export type AdminUpdateEmailInput = {
  default?: InputMaybe<Scalars['Boolean']>
  email?: InputMaybe<Scalars['String']>
  private?: InputMaybe<Scalars['Boolean']>
  verified?: InputMaybe<Scalars['Boolean']>
}

export type AdminUpdateNetworkInput = {
  endpoint: Scalars['String']
  name: Scalars['String']
}

export type AdminUpdateUserInput = {
  avatarUrl?: InputMaybe<Scalars['String']>
  developer?: InputMaybe<Scalars['Boolean']>
  name?: InputMaybe<Scalars['String']>
  role?: InputMaybe<UserRole>
  status?: InputMaybe<UserStatus>
  username?: InputMaybe<Scalars['String']>
}

export type AppConfig = {
  __typename?: 'AppConfig'
  authDiscordEnabled: Scalars['Boolean']
  authPasswordEnabled: Scalars['Boolean']
  authRegisterEnabled: Scalars['Boolean']
}

export type Asset = {
  __typename?: 'Asset'
  account?: Maybe<Scalars['String']>
  attributeMap?: Maybe<Scalars['JSON']>
  attributes?: Maybe<Array<AssetAttribute>>
  collection?: Maybe<Collection>
  createdAt: Scalars['DateTime']
  id: Scalars['String']
  identity?: Maybe<Identity>
  image?: Maybe<Scalars['String']>
  metadata?: Maybe<Scalars['JSON']>
  name: Scalars['String']
  network?: Maybe<NetworkType>
  owner?: Maybe<Scalars['String']>
  raw?: Maybe<Scalars['JSON']>
  symbol?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
}

export type AssetAttribute = {
  __typename?: 'AssetAttribute'
  count?: Maybe<Scalars['Int']>
  createdAt?: Maybe<Scalars['DateTime']>
  id?: Maybe<Scalars['String']>
  key: Scalars['String']
  updatedAt?: Maybe<Scalars['DateTime']>
  value: Scalars['String']
}

export type AssetAttributeInput = {
  count?: InputMaybe<Scalars['Int']>
  key: Scalars['String']
  value: Scalars['String']
}

export type AssetPaging = {
  __typename?: 'AssetPaging'
  data: Array<Asset>
  meta: PagingMeta
}

export type Collection = {
  __typename?: 'Collection'
  account?: Maybe<Scalars['String']>
  assetCount?: Maybe<Scalars['Int']>
  attributes?: Maybe<Array<AssetAttribute>>
  combos?: Maybe<Array<CollectionCombo>>
  createdAt: Scalars['DateTime']
  description?: Maybe<Scalars['String']>
  id: Scalars['String']
  imageUrl?: Maybe<Scalars['String']>
  metadataUrl?: Maybe<Scalars['String']>
  name: Scalars['String']
  network?: Maybe<NetworkType>
  symbol?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
  vaultId?: Maybe<Scalars['String']>
}

export type CollectionCombo = {
  __typename?: 'CollectionCombo'
  attributes?: Maybe<Array<AssetAttribute>>
  collectionAccount?: Maybe<Scalars['String']>
  createdAt: Scalars['DateTime']
  description?: Maybe<Scalars['String']>
  id: Scalars['String']
  name: Scalars['String']
  network?: Maybe<NetworkType>
  updatedAt: Scalars['DateTime']
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
  color?: Maybe<Scalars['Float']>
  conditions?: Maybe<Array<DiscordRoleCondition>>
  hoist?: Maybe<Scalars['Boolean']>
  id: Scalars['String']
  managed?: Maybe<Scalars['Boolean']>
  mentionable?: Maybe<Scalars['Boolean']>
  name: Scalars['String']
  permissions?: Maybe<Scalars['String']>
  position?: Maybe<Scalars['Float']>
  serverId?: Maybe<Scalars['String']>
}

export type DiscordRoleCondition = {
  __typename?: 'DiscordRoleCondition'
  collections?: Maybe<Array<Collection>>
  collectionsAmount?: Maybe<Scalars['Int']>
  combos?: Maybe<Array<CollectionCombo>>
  combosAmount?: Maybe<Scalars['Int']>
  createdAt?: Maybe<Scalars['DateTime']>
  id?: Maybe<Scalars['String']>
  updatedAt?: Maybe<Scalars['DateTime']>
}

export type DiscordServer = {
  __typename?: 'DiscordServer'
  botChannel?: Maybe<Scalars['String']>
  enableSync: Scalars['Boolean']
  enabled: Scalars['Boolean']
  features?: Maybe<Array<Scalars['String']>>
  icon?: Maybe<Scalars['String']>
  iconUrl?: Maybe<Scalars['String']>
  id: Scalars['String']
  name?: Maybe<Scalars['String']>
  owner?: Maybe<Scalars['Boolean']>
  permissions?: Maybe<Scalars['String']>
  roles?: Maybe<Array<DiscordRole>>
  serverUrl?: Maybe<Scalars['String']>
}

export type DiscordServerChannel = {
  __typename?: 'DiscordServerChannel'
  id: Scalars['String']
  name: Scalars['String']
  type: Scalars['String']
}

export type DiscordServerPaging = {
  __typename?: 'DiscordServerPaging'
  data: Array<DiscordServer>
  meta: PagingMeta
}

export type Email = {
  __typename?: 'Email'
  createdAt: Scalars['DateTime']
  default?: Maybe<Scalars['Boolean']>
  email: Scalars['String']
  id: Scalars['String']
  private?: Maybe<Scalars['Boolean']>
  updatedAt: Scalars['DateTime']
  verified?: Maybe<Scalars['Boolean']>
}

export type Identity = {
  __typename?: 'Identity'
  challenges?: Maybe<Array<IdentityChallenge>>
  createdAt: Scalars['DateTime']
  expired?: Maybe<Scalars['Boolean']>
  id: Scalars['String']
  name?: Maybe<Scalars['String']>
  owner?: Maybe<User>
  profile?: Maybe<Scalars['JSON']>
  provider: IdentityProvider
  providerId: Scalars['String']
  updatedAt: Scalars['DateTime']
  verified?: Maybe<Scalars['Boolean']>
}

export type IdentityChallenge = {
  __typename?: 'IdentityChallenge'
  challenge: Scalars['String']
  createdAt: Scalars['DateTime']
  id: Scalars['String']
  ip: Scalars['String']
  provider: IdentityProvider
  providerId: Scalars['String']
  signature?: Maybe<Scalars['String']>
  updatedAt: Scalars['DateTime']
  userAgent: Scalars['String']
  verified: Scalars['Boolean']
}

export enum IdentityProvider {
  Discord = 'Discord',
  Solana = 'Solana',
}

export type Job = {
  __typename?: 'Job'
  attemptsMade?: Maybe<Scalars['Int']>
  data?: Maybe<Scalars['JSON']>
  duration?: Maybe<Scalars['Int']>
  failedReason?: Maybe<Scalars['String']>
  finishedOn?: Maybe<Scalars['DateTime']>
  id?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  opts?: Maybe<Scalars['JSON']>
  processedOn?: Maybe<Scalars['DateTime']>
  returnvalue?: Maybe<Scalars['JSON']>
  stacktrace?: Maybe<Array<Scalars['String']>>
  timestamp?: Maybe<Scalars['DateTime']>
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
  providerId: Scalars['String']
}

export type LoginInput = {
  password: Scalars['String']
  username: Scalars['String']
}

export type Mutation = {
  __typename?: 'Mutation'
  adminAddCollectionComboAttribute?: Maybe<CollectionCombo>
  adminAddDiscordRoleConditionCollection?: Maybe<Scalars['Boolean']>
  adminAddDiscordRoleConditionCombo?: Maybe<Scalars['Boolean']>
  adminCleanQueue?: Maybe<Scalars['Boolean']>
  adminCreateCollection?: Maybe<Collection>
  adminCreateCollectionCombo?: Maybe<CollectionCombo>
  adminCreateDiscordRole?: Maybe<Scalars['Boolean']>
  adminCreateDiscordRoleCondition?: Maybe<Scalars['Boolean']>
  adminCreateEmail?: Maybe<Email>
  adminCreateIdentity?: Maybe<Identity>
  adminCreateNetwork?: Maybe<Network>
  adminCreateNetworkToken?: Maybe<NetworkToken>
  adminCreateUser?: Maybe<User>
  adminDeleteAsset?: Maybe<Scalars['Boolean']>
  adminDeleteCollection?: Maybe<Scalars['Boolean']>
  adminDeleteCollectionCombo?: Maybe<Scalars['Boolean']>
  adminDeleteDiscordRole?: Maybe<Scalars['Boolean']>
  adminDeleteDiscordRoleCondition?: Maybe<Scalars['Boolean']>
  adminDeleteEmail?: Maybe<Scalars['Boolean']>
  adminDeleteIdentity?: Maybe<Scalars['Boolean']>
  adminDeleteNetwork?: Maybe<Scalars['Boolean']>
  adminDeleteNetworkToken?: Maybe<Scalars['Boolean']>
  adminDeleteQueueJob?: Maybe<Scalars['Boolean']>
  adminDeleteUser?: Maybe<Scalars['Boolean']>
  adminPauseQueue?: Maybe<Scalars['Boolean']>
  adminRemoveCollectionComboAttribute?: Maybe<CollectionCombo>
  adminRemoveDiscordRoleConditionCollection?: Maybe<Scalars['Boolean']>
  adminRemoveDiscordRoleConditionCombo?: Maybe<Scalars['Boolean']>
  adminResumeQueue?: Maybe<Scalars['Boolean']>
  adminSyncCollection?: Maybe<Scalars['Boolean']>
  adminSyncCollections?: Maybe<Scalars['Boolean']>
  adminSyncDiscordRoles?: Maybe<Scalars['Boolean']>
  adminTestDiscordServerBotChannel?: Maybe<Scalars['Boolean']>
  adminUpdateCollection?: Maybe<Collection>
  adminUpdateCollectionCombo?: Maybe<CollectionCombo>
  adminUpdateDiscordServer?: Maybe<DiscordServer>
  adminUpdateEmail?: Maybe<Email>
  adminUpdateNetwork?: Maybe<Network>
  adminUpdateUser?: Maybe<User>
  login?: Maybe<User>
  logout?: Maybe<Scalars['Boolean']>
  register?: Maybe<User>
  userDeleteIdentity?: Maybe<Scalars['Boolean']>
  userLinkIdentity?: Maybe<Identity>
  userUpdateUser?: Maybe<User>
  userVerifyIdentityChallenge?: Maybe<IdentityChallenge>
}

export type MutationAdminAddCollectionComboAttributeArgs = {
  collectionComboId: Scalars['String']
  input: AssetAttributeInput
}

export type MutationAdminAddDiscordRoleConditionCollectionArgs = {
  collectionId: Scalars['String']
  conditionId: Scalars['String']
}

export type MutationAdminAddDiscordRoleConditionComboArgs = {
  comboId: Scalars['String']
  conditionId: Scalars['String']
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
  roleId: Scalars['String']
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
  assetId: Scalars['String']
}

export type MutationAdminDeleteCollectionArgs = {
  collectionId: Scalars['String']
}

export type MutationAdminDeleteCollectionComboArgs = {
  collectionComboId: Scalars['String']
}

export type MutationAdminDeleteDiscordRoleArgs = {
  input: AdminDeleteDiscordRoleInput
}

export type MutationAdminDeleteDiscordRoleConditionArgs = {
  conditionId: Scalars['String']
}

export type MutationAdminDeleteEmailArgs = {
  emailId: Scalars['String']
}

export type MutationAdminDeleteIdentityArgs = {
  identityId: Scalars['String']
}

export type MutationAdminDeleteNetworkArgs = {
  networkId: Scalars['String']
}

export type MutationAdminDeleteNetworkTokenArgs = {
  networkTokenId: Scalars['String']
}

export type MutationAdminDeleteQueueJobArgs = {
  jobId: Scalars['String']
  type: QueueType
}

export type MutationAdminDeleteUserArgs = {
  userId: Scalars['String']
}

export type MutationAdminPauseQueueArgs = {
  type: QueueType
}

export type MutationAdminRemoveCollectionComboAttributeArgs = {
  assetAttributeId: Scalars['String']
  collectionComboId: Scalars['String']
}

export type MutationAdminRemoveDiscordRoleConditionCollectionArgs = {
  collectionId: Scalars['String']
  conditionId: Scalars['String']
}

export type MutationAdminRemoveDiscordRoleConditionComboArgs = {
  comboId: Scalars['String']
  conditionId: Scalars['String']
}

export type MutationAdminResumeQueueArgs = {
  type: QueueType
}

export type MutationAdminSyncCollectionArgs = {
  collectionId: Scalars['String']
}

export type MutationAdminSyncDiscordRolesArgs = {
  serverId: Scalars['String']
}

export type MutationAdminTestDiscordServerBotChannelArgs = {
  serverId: Scalars['String']
}

export type MutationAdminUpdateCollectionArgs = {
  collectionId: Scalars['String']
  input: AdminUpdateCollectionInput
}

export type MutationAdminUpdateCollectionComboArgs = {
  collectionComboId: Scalars['String']
  input: AdminUpdateCollectionComboInput
}

export type MutationAdminUpdateDiscordServerArgs = {
  input: AdminUpdateDiscordServerInput
  serverId: Scalars['String']
}

export type MutationAdminUpdateEmailArgs = {
  emailId: Scalars['String']
  input: AdminUpdateEmailInput
}

export type MutationAdminUpdateNetworkArgs = {
  input: AdminUpdateNetworkInput
  networkId: Scalars['String']
}

export type MutationAdminUpdateUserArgs = {
  input: AdminUpdateUserInput
  userId: Scalars['String']
}

export type MutationLoginArgs = {
  input: LoginInput
}

export type MutationRegisterArgs = {
  input: RegisterInput
}

export type MutationUserDeleteIdentityArgs = {
  identityId: Scalars['String']
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
  createdAt: Scalars['DateTime']
  endpoint?: Maybe<Scalars['String']>
  id: Scalars['String']
  name: Scalars['String']
  tokens?: Maybe<Array<NetworkToken>>
  type?: Maybe<NetworkType>
  updatedAt: Scalars['DateTime']
}

export type NetworkPaging = {
  __typename?: 'NetworkPaging'
  data: Array<Network>
  meta: PagingMeta
}

export type NetworkToken = {
  __typename?: 'NetworkToken'
  address: Scalars['String']
  createdAt: Scalars['DateTime']
  decimals?: Maybe<Scalars['Int']>
  id: Scalars['String']
  name: Scalars['String']
  network?: Maybe<NetworkType>
  price?: Maybe<Scalars['Int']>
  priceDate?: Maybe<Scalars['DateTime']>
  symbol: Scalars['String']
  updatedAt: Scalars['DateTime']
}

export enum NetworkType {
  SolanaDevnet = 'SolanaDevnet',
  SolanaMainnet = 'SolanaMainnet',
}

export type PagingMeta = {
  __typename?: 'PagingMeta'
  currentPage: Scalars['Int']
  isFirstPage: Scalars['Boolean']
  isLastPage: Scalars['Boolean']
  nextPage?: Maybe<Scalars['Int']>
  pageCount?: Maybe<Scalars['Int']>
  previousPage?: Maybe<Scalars['Int']>
  totalCount?: Maybe<Scalars['Int']>
}

export type Query = {
  __typename?: 'Query'
  adminDevCheckAccount?: Maybe<Scalars['JSON']>
  adminDevCheckIdentity?: Maybe<Scalars['JSON']>
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
  adminGetBotInviteUrl?: Maybe<Scalars['String']>
  adminGetQueue?: Maybe<Queue>
  adminGetQueueJobs?: Maybe<Array<Job>>
  adminGetQueues?: Maybe<Array<Queue>>
  adminReportDiscordMemberWallets?: Maybe<Scalars['JSON']>
  adminSearchNetworkAsset?: Maybe<Scalars['JSON']>
  appConfig: AppConfig
  me?: Maybe<User>
  uptime: Scalars['Float']
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
  address: Scalars['String']
  type: NetworkType
}

export type QueryAdminDevCheckIdentityArgs = {
  provider: IdentityProvider
  providerId: Scalars['String']
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
  serverId: Scalars['String']
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
  assetId: Scalars['String']
}

export type QueryAdminFindOneCollectionArgs = {
  collectionId: Scalars['String']
}

export type QueryAdminFindOneCollectionComboArgs = {
  collectionComboId: Scalars['String']
}

export type QueryAdminFindOneDiscordServerArgs = {
  serverId: Scalars['String']
}

export type QueryAdminFindOneNetworkArgs = {
  networkId: Scalars['String']
}

export type QueryAdminFindOneUserArgs = {
  userId: Scalars['String']
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
  mint: Scalars['String']
  networkId: Scalars['String']
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
  assetId: Scalars['String']
}

export type QueryUserFindOneCollectionArgs = {
  collectionId: Scalars['String']
}

export type QueryUserFindOneUserArgs = {
  username: Scalars['String']
}

export type QueryUserRequestIdentityChallengeArgs = {
  input: RequestIdentityChallengeInput
}

export type Queue = {
  __typename?: 'Queue'
  count?: Maybe<QueueCount>
  info?: Maybe<Scalars['JSON']>
  isPaused?: Maybe<Scalars['Boolean']>
  name: Scalars['String']
  type: QueueType
}

export type QueueCount = {
  __typename?: 'QueueCount'
  active?: Maybe<Scalars['Int']>
  completed?: Maybe<Scalars['Int']>
  delayed?: Maybe<Scalars['Int']>
  failed?: Maybe<Scalars['Int']>
  paused?: Maybe<Scalars['Int']>
  waiting?: Maybe<Scalars['Int']>
}

export enum QueueType {
  AssetSyncMany = 'AssetSyncMany',
  AssetUpsertMany = 'AssetUpsertMany',
  CollectionSyncMany = 'CollectionSyncMany',
  CollectionSyncOne = 'CollectionSyncOne',
  IdentitySyncMany = 'IdentitySyncMany',
  IdentitySyncOne = 'IdentitySyncOne',
}

export type RegisterInput = {
  password: Scalars['String']
  username: Scalars['String']
}

export type RequestIdentityChallengeInput = {
  provider: IdentityProvider
  providerId: Scalars['String']
}

export type User = {
  __typename?: 'User'
  avatarUrl?: Maybe<Scalars['String']>
  createdAt?: Maybe<Scalars['DateTime']>
  developer?: Maybe<Scalars['Boolean']>
  id: Scalars['String']
  name?: Maybe<Scalars['String']>
  profileUrl?: Maybe<Scalars['String']>
  role?: Maybe<UserRole>
  status?: Maybe<UserStatus>
  updatedAt?: Maybe<Scalars['DateTime']>
  username?: Maybe<Scalars['String']>
}

export type UserFindManyAssetInput = {
  attributes?: InputMaybe<Array<AssetAttributeInput>>
  collectionAccount?: InputMaybe<Scalars['String']>
  limit?: InputMaybe<Scalars['Int']>
  network?: InputMaybe<NetworkType>
  ownerId?: InputMaybe<Scalars['String']>
  page?: InputMaybe<Scalars['Int']>
  search?: InputMaybe<Scalars['String']>
}

export type UserFindManyCollectionInput = {
  limit?: InputMaybe<Scalars['Int']>
  network?: InputMaybe<NetworkType>
  page?: InputMaybe<Scalars['Int']>
  search?: InputMaybe<Scalars['String']>
}

export type UserFindManyUserInput = {
  limit?: InputMaybe<Scalars['Int']>
  page?: InputMaybe<Scalars['Int']>
  search?: InputMaybe<Scalars['String']>
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
  avatarUrl?: InputMaybe<Scalars['String']>
  developer?: InputMaybe<Scalars['Boolean']>
  name?: InputMaybe<Scalars['String']>
}

export type VerifyIdentityChallengeInput = {
  challenge: Scalars['String']
  provider: IdentityProvider
  providerId: Scalars['String']
  signature: Scalars['String']
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
  assetId: Scalars['String']
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
  assetId: Scalars['String']
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
  assetId: Scalars['String']
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
  collectionComboId: Scalars['String']
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
  collectionComboId: Scalars['String']
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
  collectionComboId: Scalars['String']
}>

export type AdminDeleteCollectionComboMutation = { __typename?: 'Mutation'; deleted?: boolean | null }

export type AdminAddCollectionComboAttributeMutationVariables = Exact<{
  collectionComboId: Scalars['String']
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
  collectionComboId: Scalars['String']
  assetAttributeId: Scalars['String']
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
  roleId: Scalars['String']
}>

export type AdminCreateDiscordRoleConditionMutation = { __typename?: 'Mutation'; added?: boolean | null }

export type AdminDeleteDiscordRoleConditionMutationVariables = Exact<{
  conditionId: Scalars['String']
}>

export type AdminDeleteDiscordRoleConditionMutation = { __typename?: 'Mutation'; added?: boolean | null }

export type AdminAddDiscordRoleConditionCollectionMutationVariables = Exact<{
  conditionId: Scalars['String']
  collectionId: Scalars['String']
}>

export type AdminAddDiscordRoleConditionCollectionMutation = { __typename?: 'Mutation'; added?: boolean | null }

export type AdminAddDiscordRoleConditionComboMutationVariables = Exact<{
  conditionId: Scalars['String']
  comboId: Scalars['String']
}>

export type AdminAddDiscordRoleConditionComboMutation = { __typename?: 'Mutation'; added?: boolean | null }

export type AdminRemoveDiscordRoleConditionCollectionMutationVariables = Exact<{
  conditionId: Scalars['String']
  collectionId: Scalars['String']
}>

export type AdminRemoveDiscordRoleConditionCollectionMutation = { __typename?: 'Mutation'; added?: boolean | null }

export type AdminRemoveDiscordRoleConditionComboMutationVariables = Exact<{
  conditionId: Scalars['String']
  comboId: Scalars['String']
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
  collectionId: Scalars['String']
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
  collectionId: Scalars['String']
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
  collectionId: Scalars['String']
}>

export type AdminDeleteCollectionMutation = { __typename?: 'Mutation'; deleted?: boolean | null }

export type AdminSyncCollectionMutationVariables = Exact<{
  collectionId: Scalars['String']
}>

export type AdminSyncCollectionMutation = { __typename?: 'Mutation'; synced?: boolean | null }

export type AdminSyncCollectionsMutationVariables = Exact<{ [key: string]: never }>

export type AdminSyncCollectionsMutation = { __typename?: 'Mutation'; synced?: boolean | null }

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
  collectionId: Scalars['String']
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
  address: Scalars['String']
}>

export type AdminDevCheckAccountQuery = { __typename?: 'Query'; result?: any | null }

export type AdminDevCheckIdentityQueryVariables = Exact<{
  provider: IdentityProvider
  providerId: Scalars['String']
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
  serverId: Scalars['String']
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
  enabled: boolean
  enableSync: boolean
  botChannel?: string | null
  permissions?: string | null
  serverUrl?: string | null
}

export type AdminGetBotInviteUrlQueryVariables = Exact<{ [key: string]: never }>

export type AdminGetBotInviteUrlQuery = { __typename?: 'Query'; url?: string | null }

export type AdminFindOneDiscordServerQueryVariables = Exact<{
  serverId: Scalars['String']
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
  serverId: Scalars['String']
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
  serverId: Scalars['String']
}>

export type AdminTestDiscordServerBotChannelMutation = {
  __typename?: 'Mutation'
  adminTestDiscordServerBotChannel?: boolean | null
}

export type AdminUpdateDiscordServerMutationVariables = Exact<{
  serverId: Scalars['String']
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
  emailId: Scalars['String']
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
  emailId: Scalars['String']
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
  identityId: Scalars['String']
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
  identityId: Scalars['String']
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
  networkId: Scalars['String']
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
  networkId: Scalars['String']
  mint: Scalars['String']
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
  networkId: Scalars['String']
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
  networkId: Scalars['String']
}>

export type AdminDeleteNetworkMutation = { __typename?: 'Mutation'; deleted?: boolean | null }

export type AdminDeleteNetworkTokenMutationVariables = Exact<{
  networkTokenId: Scalars['String']
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
  jobId: Scalars['String']
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
  userId: Scalars['String']
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
  userId: Scalars['String']
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
  userId: Scalars['String']
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
  username: Scalars['String']
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
export const AdminSyncCollectionsDocument = gql`
  mutation adminSyncCollections {
    synced: adminSyncCollections
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
const AdminSyncCollectionsDocumentString = print(AdminSyncCollectionsDocument)
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
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: AdminFindManyAssetQuery; extensions?: any; headers: Dom.Headers; status: number }> {
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
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: AdminFindOneAssetQuery; extensions?: any; headers: Dom.Headers; status: number }> {
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
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: AdminDeleteAssetMutation; extensions?: any; headers: Dom.Headers; status: number }> {
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
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: UserFindManyAssetQuery; extensions?: any; headers: Dom.Headers; status: number }> {
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
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: UserFindOneAssetQuery; extensions?: any; headers: Dom.Headers; status: number }> {
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
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: LoginMutation; extensions?: any; headers: Dom.Headers; status: number }> {
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
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: LogoutMutation; extensions?: any; headers: Dom.Headers; status: number }> {
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
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: RegisterMutation; extensions?: any; headers: Dom.Headers; status: number }> {
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
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: MeQuery; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<MeQuery>(MeDocumentString, variables, { ...requestHeaders, ...wrappedRequestHeaders }),
        'me',
        'query',
      )
    },
    adminFindManyCollectionCombo(
      variables: AdminFindManyCollectionComboQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: AdminFindManyCollectionComboQuery; extensions?: any; headers: Dom.Headers; status: number }> {
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
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: AdminFindOneCollectionComboQuery; extensions?: any; headers: Dom.Headers; status: number }> {
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
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: AdminCreateCollectionComboMutation; extensions?: any; headers: Dom.Headers; status: number }> {
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
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: AdminUpdateCollectionComboMutation; extensions?: any; headers: Dom.Headers; status: number }> {
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
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: AdminDeleteCollectionComboMutation; extensions?: any; headers: Dom.Headers; status: number }> {
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
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{
      data: AdminAddCollectionComboAttributeMutation
      extensions?: any
      headers: Dom.Headers
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
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{
      data: AdminRemoveCollectionComboAttributeMutation
      extensions?: any
      headers: Dom.Headers
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
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{
      data: AdminCreateDiscordRoleConditionMutation
      extensions?: any
      headers: Dom.Headers
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
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{
      data: AdminDeleteDiscordRoleConditionMutation
      extensions?: any
      headers: Dom.Headers
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
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{
      data: AdminAddDiscordRoleConditionCollectionMutation
      extensions?: any
      headers: Dom.Headers
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
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{
      data: AdminAddDiscordRoleConditionComboMutation
      extensions?: any
      headers: Dom.Headers
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
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{
      data: AdminRemoveDiscordRoleConditionCollectionMutation
      extensions?: any
      headers: Dom.Headers
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
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{
      data: AdminRemoveDiscordRoleConditionComboMutation
      extensions?: any
      headers: Dom.Headers
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
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: AdminFindManyCollectionQuery; extensions?: any; headers: Dom.Headers; status: number }> {
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
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: AdminFindOneCollectionQuery; extensions?: any; headers: Dom.Headers; status: number }> {
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
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: AdminCreateCollectionMutation; extensions?: any; headers: Dom.Headers; status: number }> {
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
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: AdminUpdateCollectionMutation; extensions?: any; headers: Dom.Headers; status: number }> {
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
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: AdminDeleteCollectionMutation; extensions?: any; headers: Dom.Headers; status: number }> {
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
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: AdminSyncCollectionMutation; extensions?: any; headers: Dom.Headers; status: number }> {
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
    adminSyncCollections(
      variables?: AdminSyncCollectionsMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: AdminSyncCollectionsMutation; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminSyncCollectionsMutation>(AdminSyncCollectionsDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminSyncCollections',
        'mutation',
      )
    },
    userFindManyCollection(
      variables: UserFindManyCollectionQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: UserFindManyCollectionQuery; extensions?: any; headers: Dom.Headers; status: number }> {
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
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: UserFindOneCollectionQuery; extensions?: any; headers: Dom.Headers; status: number }> {
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
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: UptimeQuery; extensions?: any; headers: Dom.Headers; status: number }> {
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
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: AppConfigQuery; extensions?: any; headers: Dom.Headers; status: number }> {
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
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: AdminDevCheckAccountQuery; extensions?: any; headers: Dom.Headers; status: number }> {
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
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: AdminDevCheckIdentityQuery; extensions?: any; headers: Dom.Headers; status: number }> {
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
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: AdminSyncDiscordRolesMutation; extensions?: any; headers: Dom.Headers; status: number }> {
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
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: AdminCreateDiscordRoleMutation; extensions?: any; headers: Dom.Headers; status: number }> {
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
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: AdminDeleteDiscordRoleMutation; extensions?: any; headers: Dom.Headers; status: number }> {
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
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: AdminGetBotInviteUrlQuery; extensions?: any; headers: Dom.Headers; status: number }> {
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
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: AdminFindOneDiscordServerQuery; extensions?: any; headers: Dom.Headers; status: number }> {
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
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{
      data: AdminFindManyDiscordServerChannelQuery
      extensions?: any
      headers: Dom.Headers
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
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: AdminFindManyDiscordServerQuery; extensions?: any; headers: Dom.Headers; status: number }> {
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
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{
      data: AdminTestDiscordServerBotChannelMutation
      extensions?: any
      headers: Dom.Headers
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
    adminUpdateDiscordServer(
      variables: AdminUpdateDiscordServerMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: AdminUpdateDiscordServerMutation; extensions?: any; headers: Dom.Headers; status: number }> {
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
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: UserFindManyDiscordServerQuery; extensions?: any; headers: Dom.Headers; status: number }> {
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
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: AdminFindEmailsQuery; extensions?: any; headers: Dom.Headers; status: number }> {
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
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: AdminCreateEmailMutation; extensions?: any; headers: Dom.Headers; status: number }> {
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
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: AdminUpdateEmailMutation; extensions?: any; headers: Dom.Headers; status: number }> {
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
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: AdminDeleteEmailMutation; extensions?: any; headers: Dom.Headers; status: number }> {
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
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: AdminFindManyIdentityQuery; extensions?: any; headers: Dom.Headers; status: number }> {
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
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: AdminCreateIdentityMutation; extensions?: any; headers: Dom.Headers; status: number }> {
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
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: AdminDeleteIdentityMutation; extensions?: any; headers: Dom.Headers; status: number }> {
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
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: UserFindManyIdentityQuery; extensions?: any; headers: Dom.Headers; status: number }> {
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
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: UserDeleteIdentityMutation; extensions?: any; headers: Dom.Headers; status: number }> {
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
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: UserRequestIdentityChallengeQuery; extensions?: any; headers: Dom.Headers; status: number }> {
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
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: UserVerifyIdentityChallengeMutation; extensions?: any; headers: Dom.Headers; status: number }> {
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
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: UserLinkIdentityMutation; extensions?: any; headers: Dom.Headers; status: number }> {
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
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: AdminFindManyNetworkQuery; extensions?: any; headers: Dom.Headers; status: number }> {
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
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: AdminFindOneNetworkQuery; extensions?: any; headers: Dom.Headers; status: number }> {
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
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: AdminSearchNetworkAssetQuery; extensions?: any; headers: Dom.Headers; status: number }> {
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
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: AdminCreateNetworkMutation; extensions?: any; headers: Dom.Headers; status: number }> {
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
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: AdminCreateNetworkTokenMutation; extensions?: any; headers: Dom.Headers; status: number }> {
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
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: AdminUpdateNetworkMutation; extensions?: any; headers: Dom.Headers; status: number }> {
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
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: AdminDeleteNetworkMutation; extensions?: any; headers: Dom.Headers; status: number }> {
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
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: AdminDeleteNetworkTokenMutation; extensions?: any; headers: Dom.Headers; status: number }> {
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
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: AdminGetQueuesQuery; extensions?: any; headers: Dom.Headers; status: number }> {
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
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: AdminGetQueueQuery; extensions?: any; headers: Dom.Headers; status: number }> {
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
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: AdminGetQueueJobsQuery; extensions?: any; headers: Dom.Headers; status: number }> {
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
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: AdminCleanQueueMutation; extensions?: any; headers: Dom.Headers; status: number }> {
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
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: AdminDeleteQueueJobMutation; extensions?: any; headers: Dom.Headers; status: number }> {
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
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: AdminPauseQueueMutation; extensions?: any; headers: Dom.Headers; status: number }> {
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
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: AdminResumeQueueMutation; extensions?: any; headers: Dom.Headers; status: number }> {
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
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: AdminReportDiscordMemberWalletsQuery; extensions?: any; headers: Dom.Headers; status: number }> {
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
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: AdminFindManyUserQuery; extensions?: any; headers: Dom.Headers; status: number }> {
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
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: AdminFindOneUserQuery; extensions?: any; headers: Dom.Headers; status: number }> {
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
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: AdminCreateUserMutation; extensions?: any; headers: Dom.Headers; status: number }> {
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
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: AdminUpdateUserMutation; extensions?: any; headers: Dom.Headers; status: number }> {
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
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: AdminDeleteUserMutation; extensions?: any; headers: Dom.Headers; status: number }> {
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
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: UserFindManyUserQuery; extensions?: any; headers: Dom.Headers; status: number }> {
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
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: UserFindOneUserQuery; extensions?: any; headers: Dom.Headers; status: number }> {
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
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: UserUpdateUserMutation; extensions?: any; headers: Dom.Headers; status: number }> {
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
