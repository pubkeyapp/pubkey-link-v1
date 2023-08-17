import { Injectable, Logger } from '@nestjs/common'
import { Network as PrismaNetwork } from '@prisma/client'
import { ApiCoreService, Paging } from '@pubkey-link/api/core/data-access'
import { AdminCreateNetworkTokenInput } from './dto/admin-create-network-token-input'

import { AdminCreateNetworkInput } from './dto/admin-create-network.input'
import { AdminFindNetworksInput } from './dto/admin-find-networks.input'
import { AdminUpdateNetworkInput } from './dto/admin-update-network.input'
import { parseAdminFindNetworksInput } from './helpers/parse-admin-find-networks.input'

@Injectable()
export class ApiNetworkAdminService {
  private readonly logger = new Logger(ApiNetworkAdminService.name)
  constructor(private readonly core: ApiCoreService) {}

  async createNetwork(adminId: string, input: AdminCreateNetworkInput): Promise<PrismaNetwork> {
    await this.core.ensureUserAdmin(adminId)
    const found = await this.core.data.network.findUnique({ where: { name: input.name } })
    if (found) {
      throw new Error(`Network ${input.name} already exists`)
    }
    const created = await this.core.data.network.create({
      data: {
        ...input,
      },
    })
    if (!created) {
      throw new Error(`Network ${input.name} not created`)
    }
    this.logger.verbose(`Network ${input.name} created`)
    return created
  }

  async createNetworkToken(adminId: string, input: AdminCreateNetworkTokenInput) {
    await this.core.ensureUserAdmin(adminId)
    const found = await this.core.data.networkToken.findUnique({
      where: { network_address: { network: input.network, address: input.address } },
    })
    if (found) {
      throw new Error(`NetworkToken ${input.network} ${input.address} already exists`)
    }
    const created = await this.core.data.networkToken.create({
      data: {
        name: input.symbol,
        ...input,
      },
    })
    if (!created) {
      throw new Error(`NetworkToken ${input.network} ${input.address} not created`)
    }
    this.logger.verbose(`NetworkToken ${input.network} ${input.address} created`)
    return created
  }

  async deleteNetwork(adminId: string, networkId: string): Promise<boolean> {
    await this.core.ensureUserAdmin(adminId)
    const found = await this.core.data.network.findUnique({ where: { id: networkId } })
    if (!found) {
      throw new Error(`Network ${networkId} not found`)
    }
    const deleted = await this.core.data.network.delete({ where: { id: networkId } })
    if (!deleted) {
      throw new Error(`Network ${networkId} not deleted`)
    }
    return true
  }

  async deleteNetworkToken(adminId: string, networkTokenId: string): Promise<boolean> {
    await this.core.ensureUserAdmin(adminId)
    const found = await this.core.data.networkToken.findUnique({ where: { id: networkTokenId } })
    if (!found) {
      throw new Error(`NetworkToken ${networkTokenId} not found`)
    }
    const deleted = await this.core.data.networkToken.delete({ where: { id: networkTokenId } })
    if (!deleted) {
      throw new Error(`NetworkToken ${networkTokenId} not deleted`)
    }
    return true
  }

  async findNetworks(adminId: string, input: AdminFindNetworksInput): Promise<PrismaNetwork[]> {
    await this.core.ensureUserAdmin(adminId)

    const { where, orderBy, take, skip } = parseAdminFindNetworksInput(input)
    const items = await this.core.data.network.findMany({ where, orderBy, take, skip })

    return items ?? []
  }

  async findNetworksCount(adminId: string, input: AdminFindNetworksInput): Promise<Paging> {
    await this.core.ensureUserAdmin(adminId)

    const { where, orderBy, take, skip } = parseAdminFindNetworksInput(input)
    const [count, total] = await Promise.all([
      this.core.data.network.count({ where, orderBy, take, skip }),
      this.core.data.network.count({ where, orderBy }),
    ])

    return { count, skip, take, total }
  }

  async getNetwork(adminId: string, networkId: string) {
    await this.core.ensureUserAdmin(adminId)
    const found = await this.core.data.network.findUnique({
      where: { id: networkId },
      include: { tokens: true, collections: true },
    })
    if (!found) {
      throw new Error(`Network ${networkId} not found`)
    }
    return found
  }

  async updateNetwork(adminId: string, networkId: string, input: AdminUpdateNetworkInput): Promise<PrismaNetwork> {
    await this.core.ensureUserAdmin(adminId)
    const found = await this.core.data.network.findUnique({ where: { id: networkId } })
    if (!found) {
      throw new Error(`Network ${networkId} not found`)
    }
    const updated = await this.core.data.network.update({
      where: { id: networkId },
      data: { ...input },
    })
    if (!updated) {
      throw new Error(`Network ${networkId} not updated`)
    }
    return updated
  }
}
