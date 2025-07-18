import { FastifyInstance } from 'fastify'
import { register } from './register.controller'
import { session } from './session.controller'
import { profile } from './profile.controller'
import { verifyJWT } from '../../middlewares/verify-jwt'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', session)

  // authenticated
  app.get('/me', { onRequest: [verifyJWT] }, profile)
}
