import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import makeGetGymUseCase from '@/use-cases/factories/make-gym-useCase'

export async function nearby(req: FastifyRequest, res: FastifyReply) {
  const searchGymSchema = z.object({
    latitude: z.coerce.number().min(-90).max(90),
    longitude: z.coerce.number().min(-180).max(180),
    page: z.coerce.number().min(1).default(1),
  })

  const { latitude, longitude, page } = searchGymSchema.parse(req.query)
  const gymUseCase = makeGetGymUseCase()

  const gyms = await gymUseCase.findManyNearUser({ latitude, longitude }, page)

  return res.status(200).send(gyms)
}
