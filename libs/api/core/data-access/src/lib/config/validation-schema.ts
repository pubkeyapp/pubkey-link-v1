import { CronExpression } from '@nestjs/schedule'
import * as Joi from 'joi'

export const validationSchema = Joi.object({
  API_URL: Joi.string().required().error(new Error(`API_URL is required.`)),
  AUTH_DISCORD_ENABLED: Joi.boolean().default(true),
  AUTH_PASSWORD_ENABLED: Joi.boolean().default(true),
  AUTH_REGISTER_ENABLED: Joi.boolean().default(true),
  COOKIE_NAME: Joi.string().default('__session'),
  DATABASE_PROVISION: Joi.boolean().default(false),
  DATABASE_RANDOM_DATA: Joi.boolean().default(false),
  DATABASE_RESET: Joi.boolean().default(false),
  DATABASE_URL: Joi.string(),
  DISCORD_ADMIN_IDS: Joi.string(),
  DISCORD_BOT_COMMAND_ID: Joi.string().required(),
  DISCORD_BOT_DEVELOPMENT_IDS: Joi.string(),
  DISCORD_BOT_TOKEN: Joi.string().required(),
  DISCORD_CLIENT_ID: Joi.string().required(),
  DISCORD_CLIENT_SECRET: Joi.string().required(),
  GRAPHQL_PLAYGROUND: Joi.boolean().default(false),
  HELIUS_API_KEY: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  HOST: Joi.string().default('0.0.0.0'),
  LOG_COLOR: Joi.boolean().default('false'),
  LOG_JSON: Joi.boolean().default('true'),
  LOG_LEVEL: Joi.string()
    .equal('ALL', 'SILLY', 'FINE', 'VERBOSE', 'DEBUG', 'INFO', 'LOG', 'WARN', 'ERROR', 'FATAL', 'OFF')
    .default('INFO'),
  NODE_ENV: Joi.string().valid('development', 'production', 'test', 'provision').default('development'),
  PORT: Joi.number().default(3000),
  REDIS_URL: Joi.string().required(),
  SYNC_ALL_DISCORD_SERVER_ROLES: Joi.string().default(CronExpression.EVERY_10_MINUTES),
  SYNC_BOT_SERVERS: Joi.string().default(CronExpression.EVERY_5_MINUTES),
  SYNC_DRY_RUN: Joi.boolean().default(false),
  SYNC_DISCORD_IDENTITIES: Joi.string().default(CronExpression.EVERY_2_HOURS),
  SYNC_SOLANA_IDENTITIES: Joi.string().default(CronExpression.EVERY_10_MINUTES),
})
