import { ButtonTestCommand } from './button-test.command'
import { CollectionsCommand } from './collections.command'
import { ConfigCommand } from './config.command'
import { FindDiscordIdentityCommand } from './find-discord.command'
import { FindSolanaIdentityCommand } from './find-solana.command'
import { PingCommand } from './ping.command'
import { SyncCommand } from './sync.command'
import { VerifyCommand } from './verify.command'
import { WhoamiCommand } from './whoami.command'

export const commands = [
  ButtonTestCommand,
  CollectionsCommand,
  ConfigCommand,
  FindSolanaIdentityCommand,
  FindDiscordIdentityCommand,
  PingCommand,
  SyncCommand,
  VerifyCommand,
  WhoamiCommand,
]
