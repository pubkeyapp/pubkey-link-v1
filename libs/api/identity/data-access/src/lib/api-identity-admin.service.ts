import { Injectable } from '@nestjs/common'
import { Identity as PrismaIdentity } from '@prisma/client'
import { ApiCoreService } from '@pubkey-link/api/core/data-access'
import { AdminCreateIdentityInput } from './dto/admin-create-identity.input'
import { AdminFindManyIdentityInput } from './dto/admin-find-many-identity-input'

@Injectable()
export class ApiIdentityAdminService {
  constructor(private readonly core: ApiCoreService) {}

  async createIdentity(adminId: string, input: AdminCreateIdentityInput): Promise<PrismaIdentity> {
    await this.core.ensureUserAdmin(adminId)
    const found = await this.core.data.identity.findUnique({
      where: { provider_providerId: { providerId: input.providerId, provider: input.provider } },
    })
    if (found) {
      throw new Error(`Identity ${input.providerId} on ${input.provider} already exists`)
    }
    const created = await this.core.data.identity.create({
      data: {
        providerId: input.providerId,
        provider: input.provider,
        ownerId: input.ownerId,
      },
    })
    if (!created) {
      throw new Error(`Identity ${input.providerId} on ${input.provider} not created`)
    }
    return created
  }

  async deleteIdentity(adminId: string, identityId: string): Promise<boolean> {
    await this.core.ensureUserAdmin(adminId)
    const found = await this.core.data.identity.findUnique({ where: { id: identityId } })
    if (!found) {
      throw new Error(`Identity ${identityId} not found`)
    }
    const deleted = await this.core.data.identity.delete({ where: { id: identityId } })
    if (!deleted) {
      throw new Error(`Identity ${identityId} not deleted`)
    }
    return true
  }

  async findManyIdentity(adminId: string, input: AdminFindManyIdentityInput): Promise<PrismaIdentity[]> {
    await this.core.ensureUserAdmin(adminId)
    const items = await this.core.data.identity.findMany({
      where: {
        ownerId: input.ownerId ? input.ownerId : undefined,
        provider: input.provider ? input.provider : undefined,
      },
      orderBy: [{ provider: 'asc' }, { providerId: 'asc' }],
      include: {
        challenges: { orderBy: { createdAt: 'desc' } },
        owner: !input.ownerId,
      },
    })
    if (!items) {
      return []
    }
    return items
  }
}
