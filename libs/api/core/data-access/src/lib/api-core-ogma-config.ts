import { ModuleConfigFactory } from '@golevelup/nestjs-modules'

import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { OgmaModuleOptions } from '@ogma/nestjs-module'
import { ApiCoreConfigService } from './api-core-config.service'

@Injectable()
export class ApiCoreOgmaConfig implements ModuleConfigFactory<OgmaModuleOptions> {
  constructor(private readonly config: ConfigService) {}

  createModuleConfig(): OgmaModuleOptions {
    return {
      color: this.config.get('logColor'),
      json: this.config.get('logJson'),
      logLevel: this.config.get('logLevel'),
    }
  }
}
