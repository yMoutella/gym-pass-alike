import { FastifyInstance } from 'fastify'
import { register } from '../controllers/register.controller'

export async function registerRoute(app: FastifyInstance) {
  app.post('/users', register)
}
