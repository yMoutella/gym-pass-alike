import { app } from '@/app'
import createAuthenticatedUser from '@/lib/utils/test/create-authenticated-user'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import createGymReponse from '@/lib/utils/test/create-gyms'
import { nullable } from 'zod'

describe('Create Check-in (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })
  it('should create a check-in', async () => {
    const { token, user } = await createAuthenticatedUser()
    const { gym } = await createGymReponse()

    const response = await request(app.server)
      .post('/checkins')
      .send({
        gymId: gym.id,
        userId: user.id,
        userLatitude: 77.98999999999999,
        userLongitude: -100.33,
      })
      .set('Authorization', `Bearer ${token}`)

    const {
      body: { checkIn },
      status,
    } = response

    expect(status).toBe(201)
    expect(checkIn).toEqual({
      id: expect.any(String),
      created_at: expect.any(String),
      validated_at: null,
      user_id: expect.any(String),
      gym_id: expect.any(String),
    })
  })
})
