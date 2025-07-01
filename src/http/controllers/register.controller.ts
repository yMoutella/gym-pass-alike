import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { RegisterUseCase } from '@/use-cases/register'
import PrismaUserRepository from '@/repositories/prisma-users-repository'

export async function register(req: FastifyRequest, res: FastifyReply) {
  const createClientSchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string().min(6),
  })

  const { name, email, password } = createClientSchema.parse(req.body)

  try {
    const repo = new PrismaUserRepository()
    const regUseCase: RegisterUseCase = new RegisterUseCase(repo)

    const createdUser = await regUseCase.create({ name, email, password })
    return res.status(201).send(createdUser)
  } catch (error) {
    res.status(409).send('Duplicated!😓')
  }
}
