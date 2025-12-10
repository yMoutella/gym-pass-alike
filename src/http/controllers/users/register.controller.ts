import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { UserDuplicatedException } from '@/use-cases/errors/user-duplicated-exception'
import makeRegisterUseCase from '@/use-cases/factories/make-register-useCase'

export async function register(req: FastifyRequest, res: FastifyReply) {
  const createClientSchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string().min(6),
    role: z.enum(['ADMIN', 'MEMBER']).default('MEMBER'),
    plan: z.enum(['FREE', 'T1', 'T2', 'T3']).default('FREE'),
  })

  const { name, email, password, role, plan } = createClientSchema.parse(
    req.body,
  )

  try {
    const regUseCase = makeRegisterUseCase()
    const createdUser = await regUseCase.create({
      name,
      email,
      password,
      role,
      plan,
    })
    return res.status(201).send(createdUser)
  } catch (error) {
    if (error instanceof UserDuplicatedException) {
      res.status(409).send({ message: 'Duplicated!😓' })
    }

    throw error
  }
}
