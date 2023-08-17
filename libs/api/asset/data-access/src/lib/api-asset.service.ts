import { Injectable, Logger } from '@nestjs/common'
import { ApiCoreService } from '@pubkey-link/api/core/data-access'
import { ApiNetworkService } from '@pubkey-link/api/network/data-access'
import { ApiAssetAdminService } from './api-asset-admin.service'
import { ApiAssetQueueService } from './api-asset-queue.service'
import { ApiAssetUserService } from './api-asset-user.service'

@Injectable()
export class ApiAssetService {
  private readonly logger = new Logger(ApiAssetService.name)
  constructor(
    readonly admin: ApiAssetAdminService,
    readonly user: ApiAssetUserService,
    private readonly core: ApiCoreService,
    private readonly network: ApiNetworkService,
    readonly queue: ApiAssetQueueService,
  ) {}
}
