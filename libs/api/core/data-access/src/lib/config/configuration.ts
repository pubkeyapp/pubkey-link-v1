// Remove trailing slashes from the URLs to avoid double slashes
const API_URL = getUrl('API_URL') as string
// Infer the WEB URL from the API_URL if it's not set
const WEB_URL = getUrl('WEB_URL') ?? API_URL?.replace('/api', '')

const cookieDomains: string[] = getCookieDomains()

// Infer the cookie domain from the API_URL if it's not set
if (!cookieDomains.length) {
  const { hostname } = new URL(API_URL)
  cookieDomains.push(hostname)
}

const corsOrigins: string[] = getCorsOrigins()

export type Env = 'development' | 'production' | 'test' | 'provision'
export interface ApiCoreConfig {
  apiUrl: string
  authDiscordEnabled: boolean
  authPasswordEnabled: boolean
  authRegisterEnabled: boolean
  cookieDomains: string[]
  cookieName: string
  corsOrigins: string[]
  environment: Env
  databaseProvision: boolean
  databaseRandomData: boolean
  databaseReset: boolean
  discordAdminIds: string[]
  discordBotCommandId: string
  discordBotDevelopmentIds: string[]
  discordBotToken: string
  discordClientId: string
  discordClientSecret: string
  heliusApiKey: string
  host: string
  logColor: boolean
  logJson: boolean
  logLevel: string
  port: number
  redisUrl: string
  syncActive: boolean
  syncDebug: boolean
  syncDryRun: boolean
  webUrl: string
}

export const configuration = (): ApiCoreConfig => ({
  apiUrl: process.env['API_URL'] as string,
  authDiscordEnabled: process.env['AUTH_DISCORD_ENABLED'] === 'true',
  authPasswordEnabled: process.env['AUTH_PASSWORD_ENABLED'] === 'true',
  authRegisterEnabled: process.env['AUTH_REGISTER_ENABLED'] === 'true',
  cookieDomains,
  cookieName: '__session',
  corsOrigins,
  environment: (process.env['NODE_ENV'] as Env) || 'development',
  databaseProvision: process.env['DATABASE_PROVISION'] === 'true',
  databaseRandomData: process.env['DATABASE_RANDOM_DATA'] === 'true',
  databaseReset: process.env['DATABASE_RESET'] === 'true',
  discordAdminIds: getFromEnvironment('DISCORD_ADMIN_IDS'),
  discordBotCommandId: process.env['DISCORD_BOT_COMMAND_ID'] as string,
  discordBotDevelopmentIds: getFromEnvironment('DISCORD_BOT_DEVELOPMENT_IDS'),
  discordBotToken: process.env['DISCORD_BOT_TOKEN'] as string,
  discordClientId: process.env['DISCORD_CLIENT_ID'] as string,
  discordClientSecret: process.env['DISCORD_CLIENT_SECRET'] as string,
  heliusApiKey: process.env['HELIUS_API_KEY'] as string,
  host: process.env['HOST'] as string,
  logColor: process.env['LOG_COLOR'] === 'true',
  logJson: process.env['LOG_JSON'] === 'true',
  logLevel: process.env['LOG_LEVEL'] as string,
  port: parseInt(process.env['PORT'] as string, 10) || 3000,
  redisUrl: process.env['REDIS_URL'] as string,
  syncActive: process.env['SYNC_ACTIVE'] === 'true',
  syncDebug: process.env['SYNC_DEBUG'] === 'true',
  syncDryRun: process.env['SYNC_DRY_RUN'] === 'true',
  webUrl: WEB_URL,
})

// Get the cookie domains from the ENV
function getCookieDomains() {
  return getFromEnvironment('COOKIE_DOMAINS').filter(Boolean)
}

// Get the origins from the ENV
function getCorsOrigins() {
  return getFromEnvironment('CORS_ORIGINS').filter(Boolean)
}

// Get the values from the ENV
function getFromEnvironment(key: string) {
  return (process.env[key]?.includes(',') ? (process.env[key]?.split(',') as string[]) : [process.env[key]]) as string[]
}

function getUrl(key: string) {
  return process.env[key]?.replace(/\/$/, '')
}
