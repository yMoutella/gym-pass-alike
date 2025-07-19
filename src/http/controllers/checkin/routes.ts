import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify/types/instance'
import create from './create.controller'
import validate from './validate.controller'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'

export default function checkinRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)
  //verified
  app.post('/checkins', create)
  app.get('/checkins/:id', { onRequest: [verifyUserRole('MEMBER')] }, validate)
}
