// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { print } from 'graphql'
import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
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
  name?: InputMaybe<Scalars['String']>
  network?: InputMaybe<NetworkType>
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

export type AdminFindAssetsInput = {
  collectionAccount?: InputMaybe<Scalars['String']>
  network?: InputMaybe<NetworkType>
  search?: InputMaybe<Scalars['String']>
  skip?: InputMaybe<Scalars['Int']>
  take?: InputMaybe<Scalars['Int']>
}

export type AdminFindCollectionCombosInput = {
  collectionId: Scalars['String']
  network?: InputMaybe<NetworkType>
  search?: InputMaybe<Scalars['String']>
  skip?: InputMaybe<Scalars['Int']>
  take?: InputMaybe<Scalars['Int']>
}

export type AdminFindCollectionsInput = {
  network?: InputMaybe<NetworkType>
  search?: InputMaybe<Scalars['String']>
  skip?: InputMaybe<Scalars['Int']>
  take?: InputMaybe<Scalars['Int']>
}

export type AdminFindDiscordServersInput = {
  search?: InputMaybe<Scalars['String']>
  skip?: InputMaybe<Scalars['Int']>
  take?: InputMaybe<Scalars['Int']>
}

export type AdminFindEmailsInput = {
  ownerId: Scalars['String']
}

export type AdminFindIdentitiesInput = {
  ownerId?: InputMaybe<Scalars['String']>
  provider?: InputMaybe<IdentityProvider>
}

export type AdminFindNetworksInput = {
  search?: InputMaybe<Scalars['String']>
  skip?: InputMaybe<Scalars['Int']>
  take?: InputMaybe<Scalars['Int']>
  type?: InputMaybe<NetworkType>
}

export type AdminFindUsersInput = {
  role?: InputMaybe<UserRole>
  search?: InputMaybe<Scalars['String']>
  skip?: InputMaybe<Scalars['Int']>
  status?: InputMaybe<UserStatus>
  take?: InputMaybe<Scalars['Int']>
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
  account: Scalars['String']
  name: Scalars['String']
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

export type Collection = {
  __typename?: 'Collection'
  account?: Maybe<Scalars['String']>
  assetCount?: Maybe<Scalars['Int']>
  attributes?: Maybe<Array<AssetAttribute>>
  combos?: Maybe<Array<CollectionCombo>>
  createdAt: Scalars['DateTime']
  id: Scalars['String']
  name: Scalars['String']
  network?: Maybe<NetworkType>
  updatedAt: Scalars['DateTime']
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

export type DiscordRole = {
  __typename?: 'DiscordRole'
  color?: Maybe<Scalars['Float']>
  conditions?: Maybe<Array<DiscordRoleCondition>>
  hoist?: Maybe<Scalars['Boolean']>
  id?: Maybe<Scalars['String']>
  managed?: Maybe<Scalars['Boolean']>
  mentionable?: Maybe<Scalars['Boolean']>
  name?: Maybe<Scalars['String']>
  permissions?: Maybe<Scalars['Float']>
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
  permissions?: Maybe<Scalars['Float']>
  roles?: Maybe<Array<DiscordRole>>
  serverUrl?: Maybe<Scalars['String']>
}

export type DiscordServerChannel = {
  __typename?: 'DiscordServerChannel'
  id: Scalars['String']
  name: Scalars['String']
  type: Scalars['String']
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
  adminCreateDiscordRoleCondition?: Maybe<Scalars['Boolean']>
  adminCreateEmail?: Maybe<Email>
  adminCreateIdentity?: Maybe<Identity>
  adminCreateNetwork?: Maybe<Network>
  adminCreateNetworkToken?: Maybe<NetworkToken>
  adminCreateUser?: Maybe<User>
  adminDeleteAsset?: Maybe<Scalars['Boolean']>
  adminDeleteCollection?: Maybe<Scalars['Boolean']>
  adminDeleteCollectionCombo?: Maybe<Scalars['Boolean']>
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

export type Paging = {
  __typename?: 'Paging'
  count?: Maybe<Scalars['Int']>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
  total?: Maybe<Scalars['Int']>
}

export type Query = {
  __typename?: 'Query'
  adminDevCheckAccount?: Maybe<Scalars['JSON']>
  adminDevCheckIdentity?: Maybe<Scalars['JSON']>
  adminFindAssets?: Maybe<Array<Asset>>
  adminFindAssetsCount?: Maybe<Paging>
  adminFindCollectionCombos?: Maybe<Array<CollectionCombo>>
  adminFindCollectionCombosCount?: Maybe<Paging>
  adminFindCollections?: Maybe<Array<Collection>>
  adminFindCollectionsCount?: Maybe<Paging>
  adminFindDiscordServers?: Maybe<Array<DiscordServer>>
  adminFindDiscordServersCount?: Maybe<Paging>
  adminFindEmails?: Maybe<Array<Email>>
  adminFindIdentities?: Maybe<Array<Identity>>
  adminFindNetworks?: Maybe<Array<Network>>
  adminFindNetworksCount?: Maybe<Paging>
  adminFindUsers?: Maybe<Array<User>>
  adminFindUsersCount?: Maybe<Paging>
  adminGetAsset?: Maybe<Asset>
  adminGetBotInviteUrl?: Maybe<Scalars['String']>
  adminGetCollection?: Maybe<Collection>
  adminGetCollectionCombo?: Maybe<CollectionCombo>
  adminGetDiscordServer?: Maybe<DiscordServer>
  adminGetDiscordServerChannels?: Maybe<Array<DiscordServerChannel>>
  adminGetNetwork?: Maybe<Network>
  adminGetQueue?: Maybe<Queue>
  adminGetQueueJobs?: Maybe<Array<Job>>
  adminGetQueues?: Maybe<Array<Queue>>
  adminGetUser?: Maybe<User>
  adminReportDiscordMemberWallets?: Maybe<Scalars['JSON']>
  appConfig: AppConfig
  me?: Maybe<User>
  uptime: Scalars['Float']
  userFindAssets?: Maybe<Array<Asset>>
  userFindAssetsCount?: Maybe<Paging>
  userFindCollections?: Maybe<Array<Collection>>
  userFindCollectionsCount?: Maybe<Paging>
  userFindIdentities?: Maybe<Array<Identity>>
  userFindUsers?: Maybe<Array<User>>
  userFindUsersCount?: Maybe<Paging>
  userGetAsset?: Maybe<Asset>
  userGetCollection?: Maybe<Collection>
  userGetDiscordServers?: Maybe<Array<DiscordServer>>
  userGetUserByUsername?: Maybe<User>
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

export type QueryAdminFindAssetsArgs = {
  input: AdminFindAssetsInput
}

export type QueryAdminFindAssetsCountArgs = {
  input: AdminFindAssetsInput
}

export type QueryAdminFindCollectionCombosArgs = {
  input: AdminFindCollectionCombosInput
}

export type QueryAdminFindCollectionCombosCountArgs = {
  input: AdminFindCollectionCombosInput
}

export type QueryAdminFindCollectionsArgs = {
  input: AdminFindCollectionsInput
}

export type QueryAdminFindCollectionsCountArgs = {
  input: AdminFindCollectionsInput
}

export type QueryAdminFindDiscordServersArgs = {
  input: AdminFindDiscordServersInput
}

export type QueryAdminFindDiscordServersCountArgs = {
  input: AdminFindDiscordServersInput
}

export type QueryAdminFindEmailsArgs = {
  input: AdminFindEmailsInput
}

export type QueryAdminFindIdentitiesArgs = {
  input: AdminFindIdentitiesInput
}

export type QueryAdminFindNetworksArgs = {
  input: AdminFindNetworksInput
}

export type QueryAdminFindNetworksCountArgs = {
  input: AdminFindNetworksInput
}

export type QueryAdminFindUsersArgs = {
  input: AdminFindUsersInput
}

export type QueryAdminFindUsersCountArgs = {
  input: AdminFindUsersInput
}

export type QueryAdminGetAssetArgs = {
  assetId: Scalars['String']
}

export type QueryAdminGetCollectionArgs = {
  collectionId: Scalars['String']
}

export type QueryAdminGetCollectionComboArgs = {
  collectionComboId: Scalars['String']
}

export type QueryAdminGetDiscordServerArgs = {
  serverId: Scalars['String']
}

export type QueryAdminGetDiscordServerChannelsArgs = {
  serverId: Scalars['String']
}

export type QueryAdminGetNetworkArgs = {
  networkId: Scalars['String']
}

export type QueryAdminGetQueueArgs = {
  type: QueueType
}

export type QueryAdminGetQueueJobsArgs = {
  statuses: Array<JobStatus>
  type: QueueType
}

export type QueryAdminGetUserArgs = {
  userId: Scalars['String']
}

export type QueryAdminReportDiscordMemberWalletsArgs = {
  input: AdminReportDiscordMemberWalletsInput
}

export type QueryUserFindAssetsArgs = {
  input: UserFindAssetsInput
}

export type QueryUserFindAssetsCountArgs = {
  input: UserFindAssetsInput
}

export type QueryUserFindCollectionsArgs = {
  input: UserFindCollectionsInput
}

export type QueryUserFindCollectionsCountArgs = {
  input: UserFindCollectionsInput
}

export type QueryUserFindUsersArgs = {
  input: UserFindUsersInput
}

export type QueryUserFindUsersCountArgs = {
  input: UserFindUsersInput
}

export type QueryUserGetAssetArgs = {
  assetId: Scalars['String']
}

export type QueryUserGetCollectionArgs = {
  collectionId: Scalars['String']
}

export type QueryUserGetUserByUsernameArgs = {
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
  allowDm?: Maybe<Scalars['Boolean']>
  avatarUrl?: Maybe<Scalars['String']>
  createdAt?: Maybe<Scalars['DateTime']>
  description?: Maybe<Scalars['String']>
  devStack?: Maybe<Scalars['String']>
  devType?: Maybe<Scalars['String']>
  devYears?: Maybe<Scalars['String']>
  developer?: Maybe<Scalars['Boolean']>
  discordUrl?: Maybe<Scalars['String']>
  githubUrl?: Maybe<Scalars['String']>
  id: Scalars['String']
  language?: Maybe<Scalars['String']>
  location?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  profileUrl?: Maybe<Scalars['String']>
  role?: Maybe<UserRole>
  status?: Maybe<UserStatus>
  telegramUrl?: Maybe<Scalars['String']>
  twitterUrl?: Maybe<Scalars['String']>
  updatedAt?: Maybe<Scalars['DateTime']>
  username?: Maybe<Scalars['String']>
  verified?: Maybe<Scalars['Boolean']>
  websiteUrl?: Maybe<Scalars['String']>
}

export type UserFindAssetsInput = {
  attributes?: InputMaybe<Array<AssetAttributeInput>>
  collectionAccount?: InputMaybe<Scalars['String']>
  network?: InputMaybe<NetworkType>
  ownerId?: InputMaybe<Scalars['String']>
  search?: InputMaybe<Scalars['String']>
  skip?: InputMaybe<Scalars['Int']>
  take?: InputMaybe<Scalars['Int']>
}

export type UserFindCollectionsInput = {
  network?: InputMaybe<NetworkType>
  search?: InputMaybe<Scalars['String']>
  skip?: InputMaybe<Scalars['Int']>
  take?: InputMaybe<Scalars['Int']>
}

export type UserFindUsersInput = {
  search?: InputMaybe<Scalars['String']>
  skip?: InputMaybe<Scalars['Int']>
  take?: InputMaybe<Scalars['Int']>
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

export type AdminFindAssetsQueryVariables = Exact<{
  input: AdminFindAssetsInput
}>

export type AdminFindAssetsQuery = {
  __typename?: 'Query'
  count?: {
    __typename?: 'Paging'
    count?: number | null
    skip?: number | null
    take?: number | null
    total?: number | null
  } | null
  items?: Array<{
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
        allowDm?: boolean | null
        avatarUrl?: string | null
        createdAt?: Date | null
        developer?: boolean | null
        description?: string | null
        id: string
        language?: string | null
        location?: string | null
        name?: string | null
        profileUrl?: string | null
        role?: UserRole | null
        status?: UserStatus | null
        updatedAt?: Date | null
        username?: string | null
        verified?: boolean | null
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
  }> | null
}

export type AdminGetAssetQueryVariables = Exact<{
  assetId: Scalars['String']
}>

export type AdminGetAssetQuery = {
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

export type UserFindAssetsQueryVariables = Exact<{
  input: UserFindAssetsInput
}>

export type UserFindAssetsQuery = {
  __typename?: 'Query'
  count?: {
    __typename?: 'Paging'
    count?: number | null
    skip?: number | null
    take?: number | null
    total?: number | null
  } | null
  items?: Array<{
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
      network?: NetworkType | null
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
        allowDm?: boolean | null
        avatarUrl?: string | null
        createdAt?: Date | null
        developer?: boolean | null
        description?: string | null
        id: string
        language?: string | null
        location?: string | null
        name?: string | null
        profileUrl?: string | null
        role?: UserRole | null
        status?: UserStatus | null
        updatedAt?: Date | null
        username?: string | null
        verified?: boolean | null
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
  }> | null
}

export type UserGetAssetQueryVariables = Exact<{
  assetId: Scalars['String']
}>

export type UserGetAssetQuery = {
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
      network?: NetworkType | null
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
        allowDm?: boolean | null
        avatarUrl?: string | null
        createdAt?: Date | null
        developer?: boolean | null
        description?: string | null
        id: string
        language?: string | null
        location?: string | null
        name?: string | null
        profileUrl?: string | null
        role?: UserRole | null
        status?: UserStatus | null
        updatedAt?: Date | null
        username?: string | null
        verified?: boolean | null
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
    allowDm?: boolean | null
    avatarUrl?: string | null
    createdAt?: Date | null
    developer?: boolean | null
    description?: string | null
    id: string
    language?: string | null
    location?: string | null
    name?: string | null
    profileUrl?: string | null
    role?: UserRole | null
    status?: UserStatus | null
    updatedAt?: Date | null
    username?: string | null
    verified?: boolean | null
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
    allowDm?: boolean | null
    avatarUrl?: string | null
    createdAt?: Date | null
    developer?: boolean | null
    description?: string | null
    id: string
    language?: string | null
    location?: string | null
    name?: string | null
    profileUrl?: string | null
    role?: UserRole | null
    status?: UserStatus | null
    updatedAt?: Date | null
    username?: string | null
    verified?: boolean | null
  } | null
}

export type MeQueryVariables = Exact<{ [key: string]: never }>

export type MeQuery = {
  __typename?: 'Query'
  me?: {
    __typename?: 'User'
    allowDm?: boolean | null
    avatarUrl?: string | null
    createdAt?: Date | null
    developer?: boolean | null
    description?: string | null
    id: string
    language?: string | null
    location?: string | null
    name?: string | null
    profileUrl?: string | null
    role?: UserRole | null
    status?: UserStatus | null
    updatedAt?: Date | null
    username?: string | null
    verified?: boolean | null
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

export type AdminFindCollectionCombosQueryVariables = Exact<{
  input: AdminFindCollectionCombosInput
}>

export type AdminFindCollectionCombosQuery = {
  __typename?: 'Query'
  count?: {
    __typename?: 'Paging'
    count?: number | null
    skip?: number | null
    take?: number | null
    total?: number | null
  } | null
  items?: Array<{
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

export type AdminGetCollectionComboQueryVariables = Exact<{
  collectionComboId: Scalars['String']
}>

export type AdminGetCollectionComboQuery = {
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
  network?: NetworkType | null
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

export type AdminFindCollectionsQueryVariables = Exact<{
  input: AdminFindCollectionsInput
}>

export type AdminFindCollectionsQuery = {
  __typename?: 'Query'
  count?: {
    __typename?: 'Paging'
    count?: number | null
    skip?: number | null
    take?: number | null
    total?: number | null
  } | null
  items?: Array<{
    __typename?: 'Collection'
    createdAt: Date
    account?: string | null
    id: string
    name: string
    network?: NetworkType | null
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
}

export type AdminGetCollectionQueryVariables = Exact<{
  collectionId: Scalars['String']
}>

export type AdminGetCollectionQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'Collection'
    createdAt: Date
    account?: string | null
    id: string
    name: string
    network?: NetworkType | null
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
    network?: NetworkType | null
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
    network?: NetworkType | null
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

export type UserFindCollectionsQueryVariables = Exact<{
  input: UserFindCollectionsInput
}>

export type UserFindCollectionsQuery = {
  __typename?: 'Query'
  count?: {
    __typename?: 'Paging'
    count?: number | null
    skip?: number | null
    take?: number | null
    total?: number | null
  } | null
  items?: Array<{
    __typename?: 'Collection'
    createdAt: Date
    account?: string | null
    id: string
    name: string
    network?: NetworkType | null
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
}

export type UserGetCollectionQueryVariables = Exact<{
  collectionId: Scalars['String']
}>

export type UserGetCollectionQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'Collection'
    createdAt: Date
    account?: string | null
    id: string
    name: string
    network?: NetworkType | null
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

export type PagingDetailsFragment = {
  __typename?: 'Paging'
  count?: number | null
  skip?: number | null
  take?: number | null
  total?: number | null
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
    network?: NetworkType | null
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
  id?: string | null
  name?: string | null
  permissions?: number | null
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
      network?: NetworkType | null
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
  permissions?: number | null
  serverUrl?: string | null
}

export type AdminGetBotInviteUrlQueryVariables = Exact<{ [key: string]: never }>

export type AdminGetBotInviteUrlQuery = { __typename?: 'Query'; url?: string | null }

export type AdminGetDiscordServerQueryVariables = Exact<{
  serverId: Scalars['String']
}>

export type AdminGetDiscordServerQuery = {
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
    permissions?: number | null
    serverUrl?: string | null
    roles?: Array<{
      __typename?: 'DiscordRole'
      id?: string | null
      name?: string | null
      permissions?: number | null
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
          network?: NetworkType | null
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

export type AdminGetDiscordServerChannelsQueryVariables = Exact<{
  serverId: Scalars['String']
}>

export type AdminGetDiscordServerChannelsQuery = {
  __typename?: 'Query'
  items?: Array<{ __typename?: 'DiscordServerChannel'; id: string; name: string; type: string }> | null
}

export type AdminFindDiscordServersQueryVariables = Exact<{
  input: AdminFindDiscordServersInput
}>

export type AdminFindDiscordServersQuery = {
  __typename?: 'Query'
  count?: {
    __typename?: 'Paging'
    count?: number | null
    skip?: number | null
    take?: number | null
    total?: number | null
  } | null
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
    permissions?: number | null
    serverUrl?: string | null
  }> | null
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
    permissions?: number | null
    serverUrl?: string | null
  } | null
}

export type UserGetDiscordServersQueryVariables = Exact<{ [key: string]: never }>

export type UserGetDiscordServersQuery = {
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
    permissions?: number | null
    serverUrl?: string | null
    roles?: Array<{
      __typename?: 'DiscordRole'
      id?: string | null
      name?: string | null
      permissions?: number | null
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
          network?: NetworkType | null
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

export type AdminFindIdentitiesQueryVariables = Exact<{
  input: AdminFindIdentitiesInput
}>

export type AdminFindIdentitiesQuery = {
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
      allowDm?: boolean | null
      avatarUrl?: string | null
      createdAt?: Date | null
      developer?: boolean | null
      description?: string | null
      id: string
      language?: string | null
      location?: string | null
      name?: string | null
      profileUrl?: string | null
      role?: UserRole | null
      status?: UserStatus | null
      updatedAt?: Date | null
      username?: string | null
      verified?: boolean | null
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

export type UserFindIdentitiesQueryVariables = Exact<{ [key: string]: never }>

export type UserFindIdentitiesQuery = {
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

export type AdminFindNetworksQueryVariables = Exact<{
  input: AdminFindNetworksInput
}>

export type AdminFindNetworksQuery = {
  __typename?: 'Query'
  count?: {
    __typename?: 'Paging'
    count?: number | null
    skip?: number | null
    take?: number | null
    total?: number | null
  } | null
  items?: Array<{
    __typename?: 'Network'
    createdAt: Date
    endpoint?: string | null
    id: string
    name: string
    type?: NetworkType | null
    updatedAt: Date
  }> | null
}

export type AdminGetNetworkQueryVariables = Exact<{
  networkId: Scalars['String']
}>

export type AdminGetNetworkQuery = {
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
      network?: NetworkType | null
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
  allowDm?: boolean | null
  avatarUrl?: string | null
  createdAt?: Date | null
  developer?: boolean | null
  description?: string | null
  id: string
  language?: string | null
  location?: string | null
  name?: string | null
  profileUrl?: string | null
  role?: UserRole | null
  status?: UserStatus | null
  updatedAt?: Date | null
  username?: string | null
  verified?: boolean | null
}

export type AdminFindUsersQueryVariables = Exact<{
  input: AdminFindUsersInput
}>

export type AdminFindUsersQuery = {
  __typename?: 'Query'
  count?: {
    __typename?: 'Paging'
    count?: number | null
    skip?: number | null
    take?: number | null
    total?: number | null
  } | null
  items?: Array<{
    __typename?: 'User'
    allowDm?: boolean | null
    avatarUrl?: string | null
    createdAt?: Date | null
    developer?: boolean | null
    description?: string | null
    id: string
    language?: string | null
    location?: string | null
    name?: string | null
    profileUrl?: string | null
    role?: UserRole | null
    status?: UserStatus | null
    updatedAt?: Date | null
    username?: string | null
    verified?: boolean | null
  }> | null
}

export type AdminGetUserQueryVariables = Exact<{
  userId: Scalars['String']
}>

export type AdminGetUserQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'User'
    allowDm?: boolean | null
    avatarUrl?: string | null
    createdAt?: Date | null
    developer?: boolean | null
    description?: string | null
    id: string
    language?: string | null
    location?: string | null
    name?: string | null
    profileUrl?: string | null
    role?: UserRole | null
    status?: UserStatus | null
    updatedAt?: Date | null
    username?: string | null
    verified?: boolean | null
  } | null
}

export type AdminCreateUserMutationVariables = Exact<{
  input: AdminCreateUserInput
}>

export type AdminCreateUserMutation = {
  __typename?: 'Mutation'
  created?: {
    __typename?: 'User'
    allowDm?: boolean | null
    avatarUrl?: string | null
    createdAt?: Date | null
    developer?: boolean | null
    description?: string | null
    id: string
    language?: string | null
    location?: string | null
    name?: string | null
    profileUrl?: string | null
    role?: UserRole | null
    status?: UserStatus | null
    updatedAt?: Date | null
    username?: string | null
    verified?: boolean | null
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
    allowDm?: boolean | null
    avatarUrl?: string | null
    createdAt?: Date | null
    developer?: boolean | null
    description?: string | null
    id: string
    language?: string | null
    location?: string | null
    name?: string | null
    profileUrl?: string | null
    role?: UserRole | null
    status?: UserStatus | null
    updatedAt?: Date | null
    username?: string | null
    verified?: boolean | null
  } | null
}

export type AdminDeleteUserMutationVariables = Exact<{
  userId: Scalars['String']
}>

export type AdminDeleteUserMutation = { __typename?: 'Mutation'; deleted?: boolean | null }

export type UserFindUsersQueryVariables = Exact<{
  input: UserFindUsersInput
}>

export type UserFindUsersQuery = {
  __typename?: 'Query'
  count?: {
    __typename?: 'Paging'
    count?: number | null
    skip?: number | null
    take?: number | null
    total?: number | null
  } | null
  items?: Array<{
    __typename?: 'User'
    allowDm?: boolean | null
    avatarUrl?: string | null
    createdAt?: Date | null
    developer?: boolean | null
    description?: string | null
    id: string
    language?: string | null
    location?: string | null
    name?: string | null
    profileUrl?: string | null
    role?: UserRole | null
    status?: UserStatus | null
    updatedAt?: Date | null
    username?: string | null
    verified?: boolean | null
  }> | null
}

export type UserGetUserByUsernameQueryVariables = Exact<{
  username: Scalars['String']
}>

export type UserGetUserByUsernameQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'User'
    allowDm?: boolean | null
    avatarUrl?: string | null
    createdAt?: Date | null
    developer?: boolean | null
    description?: string | null
    id: string
    language?: string | null
    location?: string | null
    name?: string | null
    profileUrl?: string | null
    role?: UserRole | null
    status?: UserStatus | null
    updatedAt?: Date | null
    username?: string | null
    verified?: boolean | null
  } | null
}

export type UserUpdateUserMutationVariables = Exact<{
  input: UserUpdateUserInput
}>

export type UserUpdateUserMutation = {
  __typename?: 'Mutation'
  updated?: {
    __typename?: 'User'
    allowDm?: boolean | null
    avatarUrl?: string | null
    createdAt?: Date | null
    developer?: boolean | null
    description?: string | null
    id: string
    language?: string | null
    location?: string | null
    name?: string | null
    profileUrl?: string | null
    role?: UserRole | null
    status?: UserStatus | null
    updatedAt?: Date | null
    username?: string | null
    verified?: boolean | null
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
export const PagingDetailsFragmentDoc = gql`
  fragment PagingDetails on Paging {
    count
    skip
    take
    total
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
    network
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
    allowDm
    avatarUrl
    createdAt
    developer
    description
    id
    language
    location
    name
    profileUrl
    role
    status
    updatedAt
    username
    verified
  }
`
export const AdminFindAssetsDocument = gql`
  query adminFindAssets($input: AdminFindAssetsInput!) {
    count: adminFindAssetsCount(input: $input) {
      ...PagingDetails
    }
    items: adminFindAssets(input: $input) {
      ...AssetDetails
      identity {
        ...IdentityDetails
        owner {
          ...UserDetails
        }
      }
    }
  }
  ${PagingDetailsFragmentDoc}
  ${AssetDetailsFragmentDoc}
  ${IdentityDetailsFragmentDoc}
  ${UserDetailsFragmentDoc}
`
export const AdminGetAssetDocument = gql`
  query adminGetAsset($assetId: String!) {
    item: adminGetAsset(assetId: $assetId) {
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
export const UserFindAssetsDocument = gql`
  query userFindAssets($input: UserFindAssetsInput!) {
    count: userFindAssetsCount(input: $input) {
      ...PagingDetails
    }
    items: userFindAssets(input: $input) {
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
  ${PagingDetailsFragmentDoc}
  ${AssetDetailsFragmentDoc}
  ${CollectionDetailsFragmentDoc}
  ${IdentityDetailsFragmentDoc}
  ${UserDetailsFragmentDoc}
`
export const UserGetAssetDocument = gql`
  query userGetAsset($assetId: String!) {
    item: userGetAsset(assetId: $assetId) {
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
export const AdminFindCollectionCombosDocument = gql`
  query adminFindCollectionCombos($input: AdminFindCollectionCombosInput!) {
    count: adminFindCollectionCombosCount(input: $input) {
      ...PagingDetails
    }
    items: adminFindCollectionCombos(input: $input) {
      ...CollectionComboDetails
    }
  }
  ${PagingDetailsFragmentDoc}
  ${CollectionComboDetailsFragmentDoc}
`
export const AdminGetCollectionComboDocument = gql`
  query adminGetCollectionCombo($collectionComboId: String!) {
    item: adminGetCollectionCombo(collectionComboId: $collectionComboId) {
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
export const AdminFindCollectionsDocument = gql`
  query adminFindCollections($input: AdminFindCollectionsInput!) {
    count: adminFindCollectionsCount(input: $input) {
      ...PagingDetails
    }
    items: adminFindCollections(input: $input) {
      ...CollectionDetails
    }
  }
  ${PagingDetailsFragmentDoc}
  ${CollectionDetailsFragmentDoc}
`
export const AdminGetCollectionDocument = gql`
  query adminGetCollection($collectionId: String!) {
    item: adminGetCollection(collectionId: $collectionId) {
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
export const UserFindCollectionsDocument = gql`
  query userFindCollections($input: UserFindCollectionsInput!) {
    count: userFindCollectionsCount(input: $input) {
      ...PagingDetails
    }
    items: userFindCollections(input: $input) {
      ...CollectionDetails
    }
  }
  ${PagingDetailsFragmentDoc}
  ${CollectionDetailsFragmentDoc}
`
export const UserGetCollectionDocument = gql`
  query userGetCollection($collectionId: String!) {
    item: userGetCollection(collectionId: $collectionId) {
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
export const AdminGetBotInviteUrlDocument = gql`
  query adminGetBotInviteUrl {
    url: adminGetBotInviteUrl
  }
`
export const AdminGetDiscordServerDocument = gql`
  query adminGetDiscordServer($serverId: String!) {
    item: adminGetDiscordServer(serverId: $serverId) {
      ...DiscordServerDetails
      roles {
        ...DiscordRoleDetails
      }
    }
  }
  ${DiscordServerDetailsFragmentDoc}
  ${DiscordRoleDetailsFragmentDoc}
`
export const AdminGetDiscordServerChannelsDocument = gql`
  query adminGetDiscordServerChannels($serverId: String!) {
    items: adminGetDiscordServerChannels(serverId: $serverId) {
      ...DiscordServerChannelDetails
    }
  }
  ${DiscordServerChannelDetailsFragmentDoc}
`
export const AdminFindDiscordServersDocument = gql`
  query adminFindDiscordServers($input: AdminFindDiscordServersInput!) {
    count: adminFindDiscordServersCount(input: $input) {
      ...PagingDetails
    }
    items: adminFindDiscordServers(input: $input) {
      ...DiscordServerDetails
    }
  }
  ${PagingDetailsFragmentDoc}
  ${DiscordServerDetailsFragmentDoc}
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
export const UserGetDiscordServersDocument = gql`
  query userGetDiscordServers {
    items: userGetDiscordServers {
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
export const AdminFindIdentitiesDocument = gql`
  query adminFindIdentities($input: AdminFindIdentitiesInput!) {
    items: adminFindIdentities(input: $input) {
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
export const UserFindIdentitiesDocument = gql`
  query userFindIdentities {
    items: userFindIdentities {
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
export const AdminFindNetworksDocument = gql`
  query adminFindNetworks($input: AdminFindNetworksInput!) {
    count: adminFindNetworksCount(input: $input) {
      ...PagingDetails
    }
    items: adminFindNetworks(input: $input) {
      ...NetworkDetails
    }
  }
  ${PagingDetailsFragmentDoc}
  ${NetworkDetailsFragmentDoc}
`
export const AdminGetNetworkDocument = gql`
  query adminGetNetwork($networkId: String!) {
    item: adminGetNetwork(networkId: $networkId) {
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
export const AdminFindUsersDocument = gql`
  query adminFindUsers($input: AdminFindUsersInput!) {
    count: adminFindUsersCount(input: $input) {
      ...PagingDetails
    }
    items: adminFindUsers(input: $input) {
      ...UserDetails
    }
  }
  ${PagingDetailsFragmentDoc}
  ${UserDetailsFragmentDoc}
`
export const AdminGetUserDocument = gql`
  query adminGetUser($userId: String!) {
    item: adminGetUser(userId: $userId) {
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
export const UserFindUsersDocument = gql`
  query userFindUsers($input: UserFindUsersInput!) {
    count: userFindUsersCount(input: $input) {
      ...PagingDetails
    }
    items: userFindUsers(input: $input) {
      ...UserDetails
    }
  }
  ${PagingDetailsFragmentDoc}
  ${UserDetailsFragmentDoc}
`
export const UserGetUserByUsernameDocument = gql`
  query userGetUserByUsername($username: String!) {
    item: userGetUserByUsername(username: $username) {
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
const AdminFindAssetsDocumentString = print(AdminFindAssetsDocument)
const AdminGetAssetDocumentString = print(AdminGetAssetDocument)
const AdminDeleteAssetDocumentString = print(AdminDeleteAssetDocument)
const UserFindAssetsDocumentString = print(UserFindAssetsDocument)
const UserGetAssetDocumentString = print(UserGetAssetDocument)
const LoginDocumentString = print(LoginDocument)
const LogoutDocumentString = print(LogoutDocument)
const RegisterDocumentString = print(RegisterDocument)
const MeDocumentString = print(MeDocument)
const AdminFindCollectionCombosDocumentString = print(AdminFindCollectionCombosDocument)
const AdminGetCollectionComboDocumentString = print(AdminGetCollectionComboDocument)
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
const AdminFindCollectionsDocumentString = print(AdminFindCollectionsDocument)
const AdminGetCollectionDocumentString = print(AdminGetCollectionDocument)
const AdminCreateCollectionDocumentString = print(AdminCreateCollectionDocument)
const AdminUpdateCollectionDocumentString = print(AdminUpdateCollectionDocument)
const AdminDeleteCollectionDocumentString = print(AdminDeleteCollectionDocument)
const AdminSyncCollectionDocumentString = print(AdminSyncCollectionDocument)
const AdminSyncCollectionsDocumentString = print(AdminSyncCollectionsDocument)
const UserFindCollectionsDocumentString = print(UserFindCollectionsDocument)
const UserGetCollectionDocumentString = print(UserGetCollectionDocument)
const UptimeDocumentString = print(UptimeDocument)
const AppConfigDocumentString = print(AppConfigDocument)
const AdminDevCheckAccountDocumentString = print(AdminDevCheckAccountDocument)
const AdminDevCheckIdentityDocumentString = print(AdminDevCheckIdentityDocument)
const AdminSyncDiscordRolesDocumentString = print(AdminSyncDiscordRolesDocument)
const AdminGetBotInviteUrlDocumentString = print(AdminGetBotInviteUrlDocument)
const AdminGetDiscordServerDocumentString = print(AdminGetDiscordServerDocument)
const AdminGetDiscordServerChannelsDocumentString = print(AdminGetDiscordServerChannelsDocument)
const AdminFindDiscordServersDocumentString = print(AdminFindDiscordServersDocument)
const AdminTestDiscordServerBotChannelDocumentString = print(AdminTestDiscordServerBotChannelDocument)
const AdminUpdateDiscordServerDocumentString = print(AdminUpdateDiscordServerDocument)
const UserGetDiscordServersDocumentString = print(UserGetDiscordServersDocument)
const AdminFindEmailsDocumentString = print(AdminFindEmailsDocument)
const AdminCreateEmailDocumentString = print(AdminCreateEmailDocument)
const AdminUpdateEmailDocumentString = print(AdminUpdateEmailDocument)
const AdminDeleteEmailDocumentString = print(AdminDeleteEmailDocument)
const AdminFindIdentitiesDocumentString = print(AdminFindIdentitiesDocument)
const AdminCreateIdentityDocumentString = print(AdminCreateIdentityDocument)
const AdminDeleteIdentityDocumentString = print(AdminDeleteIdentityDocument)
const UserFindIdentitiesDocumentString = print(UserFindIdentitiesDocument)
const UserDeleteIdentityDocumentString = print(UserDeleteIdentityDocument)
const UserRequestIdentityChallengeDocumentString = print(UserRequestIdentityChallengeDocument)
const UserVerifyIdentityChallengeDocumentString = print(UserVerifyIdentityChallengeDocument)
const UserLinkIdentityDocumentString = print(UserLinkIdentityDocument)
const AdminFindNetworksDocumentString = print(AdminFindNetworksDocument)
const AdminGetNetworkDocumentString = print(AdminGetNetworkDocument)
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
const AdminFindUsersDocumentString = print(AdminFindUsersDocument)
const AdminGetUserDocumentString = print(AdminGetUserDocument)
const AdminCreateUserDocumentString = print(AdminCreateUserDocument)
const AdminUpdateUserDocumentString = print(AdminUpdateUserDocument)
const AdminDeleteUserDocumentString = print(AdminDeleteUserDocument)
const UserFindUsersDocumentString = print(UserFindUsersDocument)
const UserGetUserByUsernameDocumentString = print(UserGetUserByUsernameDocument)
const UserUpdateUserDocumentString = print(UserUpdateUserDocument)
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    adminFindAssets(
      variables: AdminFindAssetsQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: AdminFindAssetsQuery; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminFindAssetsQuery>(AdminFindAssetsDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminFindAssets',
        'query',
      )
    },
    adminGetAsset(
      variables: AdminGetAssetQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: AdminGetAssetQuery; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminGetAssetQuery>(AdminGetAssetDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminGetAsset',
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
    userFindAssets(
      variables: UserFindAssetsQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: UserFindAssetsQuery; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserFindAssetsQuery>(UserFindAssetsDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userFindAssets',
        'query',
      )
    },
    userGetAsset(
      variables: UserGetAssetQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: UserGetAssetQuery; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserGetAssetQuery>(UserGetAssetDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userGetAsset',
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
    adminFindCollectionCombos(
      variables: AdminFindCollectionCombosQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: AdminFindCollectionCombosQuery; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminFindCollectionCombosQuery>(AdminFindCollectionCombosDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminFindCollectionCombos',
        'query',
      )
    },
    adminGetCollectionCombo(
      variables: AdminGetCollectionComboQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: AdminGetCollectionComboQuery; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminGetCollectionComboQuery>(AdminGetCollectionComboDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminGetCollectionCombo',
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
    adminFindCollections(
      variables: AdminFindCollectionsQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: AdminFindCollectionsQuery; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminFindCollectionsQuery>(AdminFindCollectionsDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminFindCollections',
        'query',
      )
    },
    adminGetCollection(
      variables: AdminGetCollectionQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: AdminGetCollectionQuery; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminGetCollectionQuery>(AdminGetCollectionDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminGetCollection',
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
    userFindCollections(
      variables: UserFindCollectionsQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: UserFindCollectionsQuery; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserFindCollectionsQuery>(UserFindCollectionsDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userFindCollections',
        'query',
      )
    },
    userGetCollection(
      variables: UserGetCollectionQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: UserGetCollectionQuery; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserGetCollectionQuery>(UserGetCollectionDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userGetCollection',
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
    adminGetDiscordServer(
      variables: AdminGetDiscordServerQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: AdminGetDiscordServerQuery; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminGetDiscordServerQuery>(AdminGetDiscordServerDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminGetDiscordServer',
        'query',
      )
    },
    adminGetDiscordServerChannels(
      variables: AdminGetDiscordServerChannelsQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: AdminGetDiscordServerChannelsQuery; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminGetDiscordServerChannelsQuery>(
            AdminGetDiscordServerChannelsDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'adminGetDiscordServerChannels',
        'query',
      )
    },
    adminFindDiscordServers(
      variables: AdminFindDiscordServersQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: AdminFindDiscordServersQuery; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminFindDiscordServersQuery>(AdminFindDiscordServersDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminFindDiscordServers',
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
    userGetDiscordServers(
      variables?: UserGetDiscordServersQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: UserGetDiscordServersQuery; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserGetDiscordServersQuery>(UserGetDiscordServersDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userGetDiscordServers',
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
    adminFindIdentities(
      variables: AdminFindIdentitiesQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: AdminFindIdentitiesQuery; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminFindIdentitiesQuery>(AdminFindIdentitiesDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminFindIdentities',
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
    userFindIdentities(
      variables?: UserFindIdentitiesQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: UserFindIdentitiesQuery; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserFindIdentitiesQuery>(UserFindIdentitiesDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userFindIdentities',
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
    adminFindNetworks(
      variables: AdminFindNetworksQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: AdminFindNetworksQuery; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminFindNetworksQuery>(AdminFindNetworksDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminFindNetworks',
        'query',
      )
    },
    adminGetNetwork(
      variables: AdminGetNetworkQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: AdminGetNetworkQuery; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminGetNetworkQuery>(AdminGetNetworkDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminGetNetwork',
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
    adminFindUsers(
      variables: AdminFindUsersQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: AdminFindUsersQuery; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminFindUsersQuery>(AdminFindUsersDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminFindUsers',
        'query',
      )
    },
    adminGetUser(
      variables: AdminGetUserQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: AdminGetUserQuery; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminGetUserQuery>(AdminGetUserDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminGetUser',
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
    userFindUsers(
      variables: UserFindUsersQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: UserFindUsersQuery; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserFindUsersQuery>(UserFindUsersDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userFindUsers',
        'query',
      )
    },
    userGetUserByUsername(
      variables: UserGetUserByUsernameQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: UserGetUserByUsernameQuery; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserGetUserByUsernameQuery>(UserGetUserByUsernameDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userGetUserByUsername',
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
