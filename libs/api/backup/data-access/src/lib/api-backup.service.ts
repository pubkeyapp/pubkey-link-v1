import { Injectable, Logger } from '@nestjs/common'
import { ApiCoreService } from '@pubkey-link/api/core/data-access'
import { existsSync } from 'node:fs'
import { mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises'

@Injectable()
export class ApiBackupService {
  private readonly logger = new Logger(ApiBackupService.name)
  private readonly backupLocation: string
  constructor(private readonly core: ApiCoreService) {
    this.backupLocation = process.env['BACKUP_LOCATION'] || '/tmp'
  }

  async createBackup(adminId: string) {
    await this.core.ensureUserAdmin(adminId)
    if (!existsSync(this.backupLocation)) {
      try {
        await mkdir(this.backupLocation)
        this.logger.verbose(`Created backup directory at ${this.backupLocation}`)
      } catch (error) {
        this.logger.error(`Failed to create backup directory: ${error}`)
        return false
      }
    }

    // Generate a secret that will be used to download the backup
    const secret = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    const timestamp = getBackupTimestamp()
    const backupName = `${timestamp}${'.backup.json'}`
    const backupPath = `${this.backupLocation}/${backupName}`
    // await this.core.exec(`pg_dump -Fc > ${backupPath}`)
    this.logger.verbose(`Backup created at ${backupPath}`)

    const users = await this.core.data.user.findMany({
      where: {},
      orderBy: { username: 'asc' },
      select: {
        username: true,
        name: true,
        avatarUrl: true,
        id: true,
        role: true,
        developer: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        identities: {
          select: {
            id: true,
            provider: true,
            providerId: true,
            profile: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    })

    await writeFile(
      backupPath,
      JSON.stringify(
        {
          meta: { secret, timestamp, backupName, backupPath },
          data: { users, usersCount: users.length },
        },
        null,
        2,
      ),
    )
    return true
  }

  async deleteBackup(adminId: string, name: string) {
    await this.core.ensureUserAdmin(adminId)
    const file = this.getBackupPath(name)
    if (!existsSync(file)) {
      return false
    }
    try {
      await rm(file)
      this.logger.verbose(`Deleted backup at ${file}`)
      return true
    } catch (error) {
      this.logger.error(`Failed to delete backup: ${error}`)
      return false
    }
  }

  async fetchBackup(adminId: string, url: string) {
    await this.core.ensureUserAdmin(adminId)
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Failed to fetch backup: ${response.statusText}`)
    }
    const backup = await response.json()
    const backupPath = `${this.backupLocation}/${backup.meta.backupName}`
    if (existsSync(backupPath)) {
      throw new Error(`Backup already exists`)
    }
    await writeFile(backupPath, JSON.stringify(backup))
    this.logger.verbose(`Backup fetched at ${backupPath}`)
    return true
  }

  async adminGetBackup(adminId: string, name: string) {
    await this.core.ensureUserAdmin(adminId)
    // Parse the json file
    const backup = await this.readBackupFile(name)

    return {
      meta: backup.meta,
      usersCount: backup.data.usersCount,
      download: this.core.config.apiUrl + `/backup/download?name=${name}&secret=${backup.meta.secret}`,
    }
  }

  async adminGetBackups(adminId: string): Promise<string[]> {
    await this.core.ensureUserAdmin(adminId)
    if (!existsSync(this.backupLocation)) {
      return []
    }
    const items = await readdir(this.backupLocation)

    return items.filter((item) => item.endsWith('.backup.json'))
  }

  async restoreBackup(adminId: string, name: string) {
    await this.core.ensureUserAdmin(adminId)
    const backup = await this.readBackupFile(name)

    const userIds = await this.core.data.user
      .findMany({ select: { id: true } })
      .then((users) => users.map((user) => user.id))

    const toCreate = backup.data.users.filter((user: { id: string }) => !userIds.includes(user.id))
    if (!toCreate.length) {
      this.logger.verbose(`No new users to create`)
      return true
    }
    for (const user of toCreate) {
      const { identities, ...userData } = user
      const newUser = await this.core.data.user.create({
        data: { ...userData, identities: { create: identities } },
      })

      this.logger.verbose(`Created user ${newUser.username} with id ${newUser.id} and ${identities.length} identities`)
    }
    return true
  }

  private async readBackupFile(name: string) {
    const backupPath = this.ensureBackupFile(name)
    // Read the json file
    const contents = await readFile(backupPath, 'utf-8')
    // Parse the json file
    return JSON.parse(contents)
  }

  private ensureBackupFile(name: string) {
    const backupPath = this.getBackupPath(name)
    if (!existsSync(backupPath)) {
      throw new Error('Backup file does not exist')
    }

    return backupPath
  }

  private getBackupPath(name: string) {
    if (!isValidFilename(name)) {
      throw new Error('Invalid filename')
    }

    return `${this.backupLocation}/${name}`
  }

  async downloadBackup(name: string, secret: string) {
    const backup = await this.readBackupFile(name)

    if (backup.meta.secret !== secret) {
      throw new Error('Invalid secret')
    }

    return backup
  }
}

function isValidFilename(filename: string) {
  // Regular expression for the date-time format
  const regexPattern = /^\d{4}-\d{2}-\d{2}T\d{2}-\d{2}-\d{2}-\d{3}Z.backup.json$/

  // Check if the filename matches the pattern
  if (!regexPattern.test(filename)) {
    return false
  }

  // Check for common path traversal patterns
  return !/(\.\.\/|\.\.\\)/.test(filename)
}

function getBackupTimestamp() {
  return new Date().toISOString().replace(/:/g, '-').replace(/\./, '-')
}
