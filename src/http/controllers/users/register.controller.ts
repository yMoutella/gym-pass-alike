import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { UserDuplicatedException } from '@/use-cases/errors/user-duplicated-exception'
import makeRegisterUseCase from '@/use-cases/factories/make-register-useCase'

export async function register(req: FastifyRequest, res: FastifyReply) {
  const createClientSchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string().min(6),
  })

  const { name, email, password } = createClientSchema.parse(req.body)

  try {
    const regUseCase = makeRegisterUseCase()
    const createdUser = await regUseCase.create({ name, email, password })
    return res.status(201).send(createdUser)
  } catch (error) {
    if (error instanceof UserDuplicatedException) {
      res.status(409).send({ message: 'Duplicated!😓' })
    }

    throw error
  }
}
