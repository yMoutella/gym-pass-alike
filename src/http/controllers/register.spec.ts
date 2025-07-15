import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

describe('Register (e2e) controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register a new user', async () => {
    const response = await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
    })

    expect(response.status).toBe(201)
    expect(response.body).toEqual({
      user: expect.objectContaining({
        id: expect.any(String),
        name: 'John Doe',
        email: 'john.doe@example.com',
        created_at: expect.any(String),
      }),
    })
  })

  // it('should not register a user with an existing email', async () => {
  //   // This test will be implemented later
  //   expect(true).toBe(true)
  // })

  // it('should validate user input during registration', async () => {
  //   // This test will be implemented later
  //   expect(true).toBe(true)
  // })
})
