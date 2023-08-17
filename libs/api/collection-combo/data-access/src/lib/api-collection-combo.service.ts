import { Injectable } from '@nestjs/common'

import { ApiCollectionComboAdminService } from './api-collection-combo-admin.service'

@Injectable()
export class ApiCollectionComboService {
  constructor(readonly admin: ApiCollectionComboAdminService) {}
}
