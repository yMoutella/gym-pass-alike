import { FastifyInstance } from 'fastify'
import { verifyJWT } from '../../middlewares/verify-jwt'
import { create } from './create'
import { search } from './search'
import { nearby } from './nearby'
import { retrieve } from './retrieve'

export async function gymRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  // authenticated
  app.post('/gyms', create)
  app.get('/gyms/:id', retrieve)
  app.get('/gyms/search', search)
  app.get('/gyms/nearby', nearby)
}
