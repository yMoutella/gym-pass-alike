import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import fastifyCookie from '@fastify/cookie'

describe('Refresh (E2E) controller', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to refresh a user token', async () => {
    await request(app.server).post('/users').send({
      name: 'John doe',
      email: 'john@example.com',
      password: '12345232890',
    })

    const userAuthenticated = await request(app.server).post('/sessions').send({
      email: 'john@example.com',
      password: '12345232890',
    })

    const cookies = userAuthenticated.get('Set-Cookie')

    const response = await request(app.server)
      .patch('/sessions/refresh')
      .set('Cookie', cookies!)
      .send()

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
    expect(response.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken='),
    ])
  })
})
