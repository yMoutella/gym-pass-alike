import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import makeGetGymUseCase from '@/use-cases/factories/make-gym-useCase'

export async function create(req: FastifyRequest, res: FastifyReply) {
  const createGymSchema = z.object({
    title: z.string().min(2).max(100),
    description: z.string().max(500).nullable(),
    latitude: z.number().min(-90).max(90),
    longitude: z.number().min(-180).max(180),
    phone: z.string().nullable(),
  })

  const { title, description, latitude, longitude, phone } =
    createGymSchema.parse(req.body)

  const gymUseCase = makeGetGymUseCase()
  const createdGym = await gymUseCase.create({
    title,
    description,
    latitude,
    longitude,
    phone: phone,
  })

  return res.status(201).send(createdGym)
}
