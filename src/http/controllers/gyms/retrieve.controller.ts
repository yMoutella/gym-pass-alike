import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import makeGetGymUseCase from '@/use-cases/factories/make-gym-useCase'

export async function retrieve(req: FastifyRequest, res: FastifyReply) {
  const retrieveGymSchema = z.object({
    id: z.string().uuid(),
  })
  const { id } = retrieveGymSchema.parse(req.params)

  const gymUseCase = makeGetGymUseCase()
  try {
    const gym = await gymUseCase.findGym(id)
    return res.status(200).send(gym)
  } catch (error) {
    return res.status(404).send({ message: 'Gym not found! 😓' })
  }
}
