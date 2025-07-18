import CheckinTimeException from '@/use-cases/errors/checkin-time-exception'
import { ResourceNotFoundException } from '@/use-cases/errors/resource-not-found'
import makeCheckinUseCase from '@/use-cases/factories/make-checkin-useCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export default async function validate(req: FastifyRequest, res: FastifyReply) {
  const retrieveCheckinSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = retrieveCheckinSchema.parse(req.params)
  const checkInUseCase = makeCheckinUseCase()

  try {
    const result = await checkInUseCase.validate(id)
    return res.status(200).send(result)
  } catch (error) {
    if (error instanceof ResourceNotFoundException) {
      return res.status(404).send({ message: 'Check-in not found!❌' })
    }
    if (error instanceof CheckinTimeException) {
      return res
        .status(404)
        .send({ message: 'You exceed the check-in time!❌' })
    }
  }
}
