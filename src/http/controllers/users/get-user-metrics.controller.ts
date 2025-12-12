import makeGetUserMetricUseCase from '@/use-cases/factories/make-get-user-metric-useCase'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function metrics(req: FastifyRequest, res: FastifyReply) {
  console.log(req.user)
  const getUserMetrics = makeGetUserMetricUseCase()
  const { checkinsCount } = await getUserMetrics.execute({
    userId: req.user.sub,
  })
  return res.status(200).send({ checkinsCount })
}
