import { FastifyInstance } from 'fastify'
import { verifyJWT } from '../../middlewares/verify-jwt'
import { create } from './create.controller'
import { search } from './search.controller'
import { nearby } from './nearby.controller'
import { retrieve } from './retrieve.controller'

export async function gymRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  // authenticated
  app.post('/gyms', create)
  app.get('/gyms/:id', retrieve)
  app.get('/gyms/search', search)
  app.get('/gyms/nearby', nearby)
}
