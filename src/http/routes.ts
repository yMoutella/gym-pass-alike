import { FastifyInstance } from 'fastify'
import { register } from './controllers/register.controller'
import { session } from './controllers/session.controller'
import { profile } from './controllers/profile.controller'
import { verifyJWT } from './middlewares/verify-jwt'

export async function routes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', session)

  // authenticated
  app.get('/me', { onRequest: [verifyJWT] }, profile)
}
