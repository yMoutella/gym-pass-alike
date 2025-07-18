import makeGetUserProfileUseCase from '@/use-cases/factories/make-get-user-profile-useCase'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function profile(req: FastifyRequest, res: FastifyReply) {
  const getUserProfile = makeGetUserProfileUseCase()
  const { user } = await getUserProfile.execute({
    userId: req.user.sub,
  })

  return res.status(200).send({
    ...user,
    password_hash: undefined,
  })
}
