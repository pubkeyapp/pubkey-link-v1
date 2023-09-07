import { Injectable, Logger } from '@nestjs/common'
import { ApiCoreService } from '@pubkey-link/api/core/data-access'

import { UserFindManyUserInput } from './dto/user-find-many-user-input'
import { UserUpdateUserInput } from './dto/user-update-user.input'
import { UserPaging } from './entity/user-paging.entity'
import { getUserUserWhereInput } from './helpers/get-user-user-where-input'

@Injectable()
export class ApiUserUserService {
  private readonly logger = new Logger(ApiUserUserService.name)
  constructor(private readonly core: ApiCoreService) {}

  async findManyUser(userId: string, input: UserFindManyUserInput): Promise<UserPaging> {
    await this.core.ensureUserActive(userId)

    return this.core.data.user
      .paginate({
        orderBy: { updatedAt: 'desc' },
        where: getUserUserWhereInput(input),
      })
      .withPages({ limit: input.limit, page: input.page })
      .then(([data, meta]) => ({ data, meta }))
  }

  async updateUser(userId: string, input: UserUpdateUserInput) {
    await this.core.ensureUserActive(userId)
    const user = await this.core.data.user.update({
      where: { id: userId },
      data: input,
    })
    this.logger.verbose(`userUpdateUser: ${JSON.stringify(user)}`)
    return user
  }

  async findOneUser(userId: string, username: string) {
    await this.core.ensureUserActive(userId)
    const found = await this.core.data.user.findUnique({
      where: { username },
    })

    return {
      ...found,
    }
  }
}
