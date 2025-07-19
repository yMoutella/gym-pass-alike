import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import createAuthenticatedUser from '@/lib/utils/test/create-authenticated-user'

describe('Search nearby gym (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })
  it('Should return a nearby gym', async () => {
    const { token } = await createAuthenticatedUser(true)
    const createdGym = await request(app.server)
      .post(`/gyms`)
      .send({
        title: 'Rat Gym',
        description: 'A gym for rats',
        latitude: 77.98999999999999,
        longitude: -100.33,
        phone: '123456789',
      })
      .set('Authorization', `Bearer ${token}`)

    const response = await request(app.server)
      .get('/gyms/nearby')
      .query({
        latitude: createdGym.body.gym.latitude,
        longitude: createdGym.body.gym.longitude,
        page: 1,
      })
      .set('Authorization', `Bearer ${token}`)

    const { body, status } = response

    expect(status).toBe(200)
    expect(body).toEqual(
      expect.objectContaining({
        gyms: expect.arrayContaining([
          expect.objectContaining({
            title: 'Rat Gym',
            id: expect.any(String),
            description: expect.any(String),
            latitude: expect.any(String),
            longitude: expect.any(String),
            phone: expect.any(String),
          }),
        ]),
      }),
    )
  })
})
