import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

describe('Search gyms', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })
  it('should return a list of gyms matching the search criteria', async () => {
    await request(app.server).post('/users').send({
      name: 'Yure Moutella',
      email: 'ymoutella@gmail.com',
      password: 'ymoutella',
    })

    const {
      body: { token },
    } = await request(app.server).post('/sessions').send({
      email: 'ymoutella@gmail.com',
      password: 'ymoutella',
    })

    await request(app.server)
      .post('/gyms')
      .send({
        title: 'Rat Gym',
        description: 'A gym for rats',
        latitude: 77.98999999999999,
        longitude: -100.33,
        phone: '123456789',
      })
      .set('Authorization', `Bearer ${token}`)

    const response = await request(app.server)
      .get('/gyms/search')
      .query({
        q: 'Rat',
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
