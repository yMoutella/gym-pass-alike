import { app } from '@/app'
import request from 'supertest'
import createAuthenticatedUser from './create-authenticated-user'

export default async function createGymReponse() {
  const { token } = await createAuthenticatedUser()

  const res = await request(app.server)
    .post('/gyms')
    .send({
      title: 'Rat Gym',
      description: 'A gym for rats',
      latitude: 77.98999999999999,
      longitude: -100.33,
      phone: '123456789',
    })
    .set('Authorization', `Bearer ${token}`)

  const { gym } = res.body

  return {
    gym,
  }
}
