import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

describe('Profile (e2e) controller', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should not be able to get the user profile', async () => {
    await request(app.server).get('/me').expect(401)
  })

  it('should be able to get the user profile', async () => {
    await request(app.server).post('/users').send({
      name: 'John doe',
      email: 'johndoe@example.com',
      password: '1skldjaslkd2345232890',
    })

    const { body: session } = await request(app.server).post('/sessions').send({
      email: 'johndoe@example.com',
      password: '1skldjaslkd2345232890',
    })

    const { token } = session

    const response = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${token}`)

    const { status, body } = response

    expect(status).toBe(200)
    expect(body).toEqual({
      id: expect.any(String),
      name: expect.any(String),
      email: expect.any(String),
      created_at: expect.any(String),
    })
  })
})
