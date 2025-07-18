import { app } from '@/app'
import request from 'supertest'

interface CreateAuthenticatedUserResponse {
  token: string
}

export default async function createAuthenticatedUser(): Promise<CreateAuthenticatedUserResponse> {
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

  return {
    token,
  }
}
