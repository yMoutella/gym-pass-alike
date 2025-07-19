import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { create } from 'domain'
import createAuthenticatedUser from '@/lib/utils/test/create-authenticated-user'

describe('Session (E2E) controller', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate a user', async () => {
    const authUser = await createAuthenticatedUser(true)
    const response = await request(app.server).post('/sessions').send({
      email: authUser.user.email,
      password: 'ymoutella',
    })

    const { body, status } = response

    expect(status).toBe(200)
    expect(body).toEqual({
      token: expect.any(String),
    })
  })

  it('should not be able to authenticate a user', async () => {
    const response = await request(app.server).post('/sessions').send({
      email: 'john@example.com',
      password: '1skldjaslkd2345232890',
    })

    const { body, status } = response

    expect(status).toBe(400)
    expect(body).toEqual({
      message: expect.any(String),
    })
  })
})
