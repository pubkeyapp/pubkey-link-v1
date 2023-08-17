import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { LogLevel } from '@ogma/common'
import { CookieOptions } from 'express-serve-static-core'
import { RedisOptions } from 'ioredis'
import { ApiCoreConfig } from './config/configuration'
import { AppConfig } from './entity/app-config.entity'

@Injectable()
export class ApiCoreConfigService {
  private readonly logger = new Logger(ApiCoreConfigService.name)
  constructor(private readonly service: ConfigService<ApiCoreConfig>) {}

  get appConfig(): AppConfig {
    return {
      authDiscordEnabled: this.authDiscordEnabled,
      authPasswordEnabled: this.authPasswordEnabled,
      authRegisterEnabled: this.authRegisterEnabled,
    }
  }

  get authDiscordEnabled(): boolean {
    return this.service.get<boolean>('authDiscordEnabled') ?? false
  }

  get authPasswordEnabled(): boolean {
    return this.service.get<boolean>('authPasswordEnabled') ?? false
  }

  get authRegisterEnabled(): boolean {
    return this.service.get<boolean>('authRegisterEnabled') ?? false
  }

  get apiUrl(): string {
    return this.service.get<string>('apiUrl') as string
  }

  get cookieDomains(): string[] {
    return this.service.get<string[]>('cookieDomains') ?? []
  }

  get cookieName(): string {
    return this.service.get('cookieName') as string
  }

  cookieOptions(hostname: string): CookieOptions {
    const found = this.cookieDomains.find((domain) => hostname.endsWith(domain))
    if (!found) {
      this.logger.warn(
        `Not configured to set cookies for ${hostname}. cookieDomains: ${
          this.cookieDomains.length ? this.cookieDomains.join(', ') : 'not configured'
        }`,
      )
    }
    const isSecure = this.apiUrl.startsWith('https')
    return {
      httpOnly: true,
      secure: isSecure,
      domain: found || this.cookieDomains[0],
      sameSite: isSecure ? 'none' : 'strict',
    } as CookieOptions
  }
  get databaseProvision() {
    return this.service.get<boolean>('databaseProvision')
  }

  get databaseRandomData() {
    return this.service.get<boolean>('databaseRandomData')
  }

  get databaseReset() {
    return this.service.get<boolean>('databaseReset')
  }

  get discordAdminIds() {
    return this.service.get<string[]>('discordAdminIds')
  }

  get discordBotCommandId() {
    return this.service.get<string>('discordBotCommandId') ?? []
  }

  get discordDevelopmentIds() {
    return this.service.get<string[]>('discordBotDevelopmentIds') ?? []
  }

  get discordBotPermissions() {
    return '268435456'
  }

  get discordBotToken() {
    return this.service.get<string>('discordBotToken')
  }

  get environment() {
    return this.service.get('environment')
  }

  get heliusApiKey() {
    return this.service.get<string>('heliusApiKey')
  }

  get host() {
    return this.service.get<string>('host')
  }

  get logColor() {
    return this.service.get<boolean>('logColor')
  }

  get logJson() {
    return this.service.get<boolean>('logJson')
  }

  get logLevel() {
    return this.service.get<keyof typeof LogLevel>('logLevel')
  }

  get port() {
    return this.service.get<number>('port')
  }

  get prefix() {
    return 'api'
  }

  get redisOptions(): RedisOptions {
    // Parse the Redis URL to get the host, port, and password, etc.
    const parsed = new URL(this.redisUrl)

    // The URL class encodes the password if it contains special characters, so we need to decode it.
    // https://nodejs.org/dist/latest-v18.x/docs/api/url.html#urlpassword
    // This caused an issue because Azure Cache for Redis generates passwords that end with an equals sign.
    const password = parsed.password ? decodeURIComponent(parsed.password) : undefined

    return {
      host: parsed.hostname,
      port: Number(parsed.port),
      password: password,
      username: parsed.username,
      tls: parsed.protocol?.startsWith('rediss')
        ? {
            rejectUnauthorized: false,
          }
        : undefined,
    }
  }

  get redisUrl() {
    return this.service.get('redisUrl')
  }

  get syncDryRun() {
    return this.service.get<boolean>('syncDryRun')
  }

  get isDevelopment(): boolean {
    return this.environment === 'development'
  }

  get webUrl(): string {
    return this.service.get<string>('webUrl') as string
  }
}
