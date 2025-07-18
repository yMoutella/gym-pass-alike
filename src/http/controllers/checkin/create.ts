import CheckinTimeException from '@/use-cases/errors/checkin-time-exception'
import GymToDistantException from '@/use-cases/errors/gym-to-distant-exception'
import makeCheckinUseCase from '@/use-cases/factories/make-checkin-useCase'
import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export default async function create(req: FastifyRequest, res: FastifyReply) {
  const createCheckinSchema = z.object({
    userId: z.string().uuid(),
    gymId: z.string().uuid(),
    userLatitude: z.number().min(-90).max(90),
    userLongitude: z.number().min(-180).max(180),
  })

  const { userId, gymId, userLatitude, userLongitude } =
    createCheckinSchema.parse(req.body)

  const checkInUseCase = makeCheckinUseCase()

  try {
    const result = await checkInUseCase.create({
      userId,
      gymId,
      userLatitude,
      userLongitude,
    })
    return res.status(201).send(result)
  } catch (error) {
    if (error instanceof GymToDistantException) {
      return res.status(400).send({ message: 'Gym is too distant!🏃' })
    }

    if (error instanceof CheckinTimeException) {
      return res
        .status(400)
        .send({ message: 'You already checked in today!⌛' })
    }
  }
}
