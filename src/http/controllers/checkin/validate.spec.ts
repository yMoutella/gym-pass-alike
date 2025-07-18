import { app } from '@/app'
import createAuthenticatedUser from '@/lib/utils/test/create-authenticated-user'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import CreateGymsReponse from '@/lib/utils/test/create-gyms'
import createGymReponse from '@/lib/utils/test/create-gyms'

describe('Validate Check-in (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })
  it('should validate a check-in', async () => {
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

    const { body } = response

    const {
      body: { checkIn },
      status,
    } = await request(app.server)
      .get(`/checkins/${body.checkIn.id}`)
      .set('Authorization', `Bearer ${token}`)

    expect(status).toBe(200)
    expect(checkIn).toEqual({
      id: expect.any(String),
      created_at: expect.any(String),
      validated_at: expect.any(String),
      user_id: expect.any(String),
      gym_id: expect.any(String),
    })
  })
})
