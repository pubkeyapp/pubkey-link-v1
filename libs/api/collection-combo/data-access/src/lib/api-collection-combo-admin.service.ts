import { Injectable, Logger } from '@nestjs/common'
import { CollectionCombo as PrismaCollectionCombo } from '@prisma/client'
import { AssetAttributeInput } from '@pubkey-link/api/asset/data-access'
import { ApiCoreService } from '@pubkey-link/api/core/data-access'
import { ApiNetworkService } from '@pubkey-link/api/network/data-access'

import { AdminCreateCollectionComboInput } from './dto/admin-create-collection-combo.input'
import { AdminFindManyCollectionComboInput } from './dto/admin-find-many-collection-combo-input'
import { AdminUpdateCollectionComboInput } from './dto/admin-update-collection-combo.input'
import { CollectionComboPaging } from './entity/collection-combo-paging'
import { getAdminFindCollectionComboWhereInput } from './helpers/get-admin-find-collection-combo-where-input'

@Injectable()
export class ApiCollectionComboAdminService {
  private readonly logger = new Logger(ApiCollectionComboAdminService.name)
  constructor(private readonly core: ApiCoreService, private readonly network: ApiNetworkService) {}

  async createCollectionCombo(adminId: string, input: AdminCreateCollectionComboInput): Promise<PrismaCollectionCombo> {
    await this.core.ensureUserAdmin(adminId)
    const collection = await this.core.ensureCollection(input.collectionId)

    const exists = collection.combos.find((c) => c.name === input.name)
    if (exists) {
      throw new Error(`CollectionCombo ${input.name} already exists`)
    }

    const created = await this.core.data.collectionCombo.create({
      data: {
        collection: { connect: { id: input.collectionId } },
        name: input.name,
        description: input.description,
        Network: { connect: { type: collection.network } },
      },
    })
    if (!created) {
      throw new Error(`CollectionCombo ${input.name} not created`)
    } else {
      this.logger.verbose(`CollectionCombo ${input.name} created`)
    }
    return created
  }

  async deleteCollectionCombo(adminId: string, collectionComboId: string): Promise<boolean> {
    await this.core.ensureUserAdmin(adminId)
    const found = await this.core.data.collectionCombo.findUnique({ where: { id: collectionComboId } })
    if (!found) {
      throw new Error(`CollectionCombo ${collectionComboId} not found`)
    }
    const deleted = await this.core.data.collectionCombo.delete({ where: { id: collectionComboId } })
    if (!deleted) {
      throw new Error(`CollectionCombo ${collectionComboId} not deleted`)
    }
    return true
  }

  async findManyCollectionCombo(
    adminId: string,
    input: AdminFindManyCollectionComboInput,
  ): Promise<CollectionComboPaging> {
    await this.core.ensureUserAdmin(adminId)
    return this.core.data.collectionCombo
      .paginate({
        where: getAdminFindCollectionComboWhereInput(input),
        orderBy: { updatedAt: 'desc' },
        include: { attributes: true },
      })
      .withPages({ limit: input.limit, page: input.page })
      .then(([data, meta]) => ({ data, meta }))
  }

  async findOneCollectionCombo(adminId: string, collectionComboId: string) {
    await this.core.ensureUserAdmin(adminId)
    const found = await this.core.data.collectionCombo.findUnique({
      where: { id: collectionComboId },
      include: { attributes: true },
    })
    if (!found) {
      throw new Error(`CollectionCombo ${collectionComboId} not found`)
    }
    return found
  }

  async updateCollectionCombo(
    adminId: string,
    collectionComboId: string,
    input: AdminUpdateCollectionComboInput,
  ): Promise<PrismaCollectionCombo> {
    await this.core.ensureUserAdmin(adminId)
    const found = await this.core.data.collectionCombo.findUnique({ where: { id: collectionComboId } })
    if (!found) {
      throw new Error(`CollectionCombo ${collectionComboId} not found`)
    }
    const updated = await this.core.data.collectionCombo.update({
      where: { id: collectionComboId },
      data: { ...input },
    })
    if (!updated) {
      throw new Error(`CollectionCombo ${collectionComboId} not updated`)
    }
    return updated
  }

  async addCollectionComboAttribute(adminId: string, collectionComboId: string, input: AssetAttributeInput) {
    const found = await this.findOneCollectionCombo(adminId, collectionComboId)
    const foundAttribute = await this.core.data.assetAttribute.findFirst({
      where: {
        collection: { account: found.collectionAccount, network: found.network },
        key: input.key,
        value: input.value,
      },
      include: { collection: true },
    })

    return this.core.data.collectionCombo.update({
      where: { id: collectionComboId },
      data: {
        attributes: foundAttribute
          ? { connect: { id: foundAttribute.id } }
          : {
              create: {
                ...input,
                collection: {
                  connect: { account_network: { account: found.collectionAccount, network: found.network } },
                },
              },
            },
      },
    })
  }

  async removeCollectionComboAttribute(adminId: string, collectionComboId: string, assetAttributeId: string) {
    const found = await this.findOneCollectionCombo(adminId, collectionComboId)
    const exists = found.attributes.find((a) => a.id === assetAttributeId)
    if (!exists) {
      throw new Error(`CollectionCombo ${collectionComboId} attribute ${assetAttributeId} does not exist`)
    }
    return this.core.data.collectionCombo.update({
      where: { id: collectionComboId },
      data: { attributes: { delete: { id: assetAttributeId } } },
    })
  }
}
