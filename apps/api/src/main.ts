import { ApiCoreService } from '@pubkey-link/api/core/data-access'
import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { OgmaService } from '@ogma/nestjs-module'
import { exec } from 'node:child_process'
import cookieParser from 'cookie-parser'
import { AppModule } from './app/app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true })
  const core = app.get(ApiCoreService)
  const logger = app.get<OgmaService>(OgmaService)
  app.useLogger(logger)
  app.setGlobalPrefix(core.config.prefix)
  app.use(cookieParser())
  const host = `http://${core.config.host}:${core.config.port}`
  await app.listen(core.config.port, core.config.host)
  Logger.log(`🚀 RestAPI is running on: ${host}/${core.config.prefix}.`)
  Logger.log(`🚀 GraphQL is running on: ${host}/graphql.`)
  Logger.log(`🔋 API_URL: ${core.config.apiUrl}`)
  Logger.log(`🔋 WEB_URL: ${core.config.webUrl}`)
  Logger.log(`🔋 COOKIE_DOMAINS: ${core.config.cookieDomains.join(', ')}`)
  if (core.config.isDevelopment) {
    Logger.warn(`🐞 Application is running in development mode.`)
    exec('prettier --write ./api-schema.graphql ./api-swagger.json', { cwd: process.cwd() })
  }
}

bootstrap()
