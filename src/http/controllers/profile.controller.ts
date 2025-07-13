import { FastifyReply, FastifyRequest } from 'fastify'

export async function profile(req: FastifyRequest, res: FastifyReply) {
  await req.jwtVerify()

  console.log(req.user.sub)

  return res.send(200)
}
