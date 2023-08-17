import {
  AdminCreateUserInput,
  AdminFindUsersInput,
  AdminUpdateUserInput,
  User,
  UserRole,
  UserStatus,
} from '@pubkey-link/sdk'
import { getAliceCookie, getBobCookie, sdk, uniqueId } from '../support'

function avatarUrl(name) {
  return `https://source.boringavatars.com/pixel/120/pubkey-link-${name}`
}

describe('api-user-feature', () => {
  describe('api-user-admin-resolver', () => {
    describe('authorized', () => {
      let cookie: string

      beforeAll(async () => {
        cookie = await getAliceCookie()
      })

      it('should create a user', async () => {
        const input: AdminCreateUserInput = {
          username: uniqueId('user'),
          password: uniqueId('pass'),
        }

        const res = await sdk.adminCreateUser({ input }, { cookie })

        const user: User = res.data.created
        expect(user.status).toBe(UserStatus.Created)
        expect(user.role).toBe(UserRole.User)
        expect(user.username).toBe(input.username)
        expect(user.avatarUrl).toContain(avatarUrl(user.username))
        expect(user.name).toBeNull()
        expect(user.id).toBeDefined()
        expect(user.createdAt).toBeDefined()
        expect(user.updatedAt).toBeDefined()
        expect((user as { password?: string }).password).toBeUndefined()
      })

      it('should update a user', async () => {
        const createInput: AdminCreateUserInput = {
          username: uniqueId('user'),
          password: uniqueId('pass'),
        }
        const createdRes = await sdk.adminCreateUser({ input: createInput }, { cookie })
        const userId = createdRes.data.created.id
        const input: AdminUpdateUserInput = {
          avatarUrl: avatarUrl(createdRes.data.created.username),
          name: 'John Doe',
          role: UserRole.Admin,
          status: UserStatus.Active,
        }

        const res = await sdk.adminUpdateUser({ userId, input }, { cookie })

        const user: User = res.data.updated
        expect(user.avatarUrl).toBe(input.avatarUrl)
        expect(user.name).toBe(input.name)
        expect(user.role).toBe(input.role)
        expect(user.status).toBe(input.status)
      })

      it('should not update a user with an existing name', async () => {
        const createInput: AdminCreateUserInput = {
          username: uniqueId('user'),
          password: uniqueId('pass'),
        }
        const createdRes = await sdk.adminCreateUser({ input: createInput }, { cookie })
        const userId = createdRes.data.created.id
        expect.assertions(1)

        const input: AdminUpdateUserInput = {
          username: 'alice',
        }
        try {
          await sdk.adminUpdateUser({ userId, input }, { cookie })
        } catch (e) {
          expect(e.message).toBe(`User ${input.username} already exists`)
        }
      })

      it('should find a list of users (find all)', async () => {
        const createInput: AdminCreateUserInput = {
          username: uniqueId('user'),
          password: uniqueId('pass'),
        }
        const createdRes = await sdk.adminCreateUser({ input: createInput }, { cookie })
        const userId = createdRes.data.created.id

        const input: AdminFindUsersInput = {}

        const res = await sdk.adminFindUsers({ input }, { cookie })

        expect(res.data.count.total).toBeGreaterThan(4)
        expect(res.data.items.length).toBeGreaterThan(4)
        // First item should be the one we created above
        expect(res.data.items[0].id).toBe(userId)
      })

      it('should find a list of users (find new one)', async () => {
        const createInput: AdminCreateUserInput = {
          username: uniqueId('user'),
          password: uniqueId('pass'),
        }
        const createdRes = await sdk.adminCreateUser({ input: createInput }, { cookie })
        const userId = createdRes.data.created.id

        const input: AdminFindUsersInput = {
          search: userId,
        }

        const res = await sdk.adminFindUsers({ input }, { cookie })

        expect(res.data.count.total).toBe(1)
        expect(res.data.items.length).toBe(1)
        expect(res.data.items[0].id).toBe(userId)
      })

      it('should find a user by id', async () => {
        const createInput: AdminCreateUserInput = {
          username: uniqueId('user'),
          password: uniqueId('pass'),
        }
        const createdRes = await sdk.adminCreateUser({ input: createInput }, { cookie })
        const userId = createdRes.data.created.id

        const res = await sdk.adminGetUser({ userId }, { cookie })

        expect(res.data.item.id).toBe(userId)
      })

      it('should delete a user', async () => {
        const createInput: AdminCreateUserInput = {
          username: uniqueId('user'),
          password: uniqueId('pass'),
        }
        const createdRes = await sdk.adminCreateUser({ input: createInput }, { cookie })
        const userId = createdRes.data.created.id

        const res = await sdk.adminDeleteUser({ userId }, { cookie })

        expect(res.data.deleted).toBe(true)

        const findRes = await sdk.adminFindUsers({ input: { search: userId } }, { cookie })
        expect(findRes.data.count.total).toBe(0)
        expect(findRes.data.items.length).toBe(0)
      })
    })

    describe('unauthorized', () => {
      let cookie: string
      beforeAll(async () => {
        cookie = await getBobCookie()
      })

      it('should not create a user', async () => {
        expect.assertions(1)
        const input: AdminCreateUserInput = {
          username: uniqueId('user'),
          password: uniqueId('pass'),
        }

        try {
          await sdk.adminCreateUser({ input }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: Not an admin')
        }
      })

      it('should not update a user', async () => {
        expect.assertions(1)
        try {
          await sdk.adminUpdateUser({ userId: 'alice', input: {} }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: Not an admin')
        }
      })

      it('should not find a list of users (find all)', async () => {
        expect.assertions(1)
        try {
          await sdk.adminFindUsers({ input: {} }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: Not an admin')
        }
      })

      it('should not find a user by id', async () => {
        expect.assertions(1)
        try {
          await sdk.adminGetUser({ userId: 'alice' }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: Not an admin')
        }
      })

      it('should not delete a user', async () => {
        expect.assertions(1)
        try {
          await sdk.adminDeleteUser({ userId: 'alice' }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: Not an admin')
        }
      })
    })
  })
})