import { FastifyInstance } from 'fastify'
import { register } from './controllers/register.controller'
import { auth } from './controllers/auth.controller'

export async function routes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/auth', auth)
}
