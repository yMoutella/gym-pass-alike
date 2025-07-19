import { FastifyReply, FastifyRequest } from 'fastify'

export function verifyUserRole(roleToVerify: 'ADMIN' | 'MEMBER') {
  return async (req: FastifyRequest, res: FastifyReply) => {
    if (req.user.role !== roleToVerify) {
      return res.status(403).send({ message: 'Forbidden' })
    }
  }
}
