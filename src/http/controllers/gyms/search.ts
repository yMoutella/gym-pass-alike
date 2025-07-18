import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import makeGetGymUseCase from '@/use-cases/factories/make-gym-useCase'

export async function search(req: FastifyRequest, res: FastifyReply) {
  const searchGymSchema = z.object({
    q: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { q, page } = searchGymSchema.parse(req.query)
  const gymUseCase = makeGetGymUseCase()

  const gyms = await gymUseCase.findGymByName(q, page)

  return res.status(200).send(gyms)
}
