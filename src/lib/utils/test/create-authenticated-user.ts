import { app } from '@/app'
import request from 'supertest'

interface CreateAuthenticatedUserResponse {
  token: string
  user: {
    id: string
    name: string
    email: string
    password_hash: string
    created_at: string
  }
}

export default async function createAuthenticatedUser(
  isAdmin = false,
): Promise<CreateAuthenticatedUserResponse> {
  const {
    body: { user },
  } = await request(app.server)
    .post('/users')
    .send({
      name: 'Yure Moutella',
      email: 'ymoutella@gmail.com',
      password: 'ymoutella',
      role: isAdmin ? 'ADMIN' : 'MEMBER',
    })

  const {
    body: { token },
  } = await request(app.server).post('/sessions').send({
    email: 'ymoutella@gmail.com',
    password: 'ymoutella',
  })

  return {
    token,
    user,
  }
}
