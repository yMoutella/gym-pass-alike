import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { InvalidCredentialsException } from '@/use-cases/errors/invalid-credentials-exception'
import makeAuthUseCase from '@/use-cases/factories/make-auth-useCase'

export async function auth(req: FastifyRequest, res: FastifyReply) {
  const authSchema = z.object({
    email: z.string(),
    password: z.string().min(6),
  })

  const { email, password } = authSchema.parse(req.body)

  try {
    const authUseCase = makeAuthUseCase()
    authUseCase.execute({ email, password })
    return res.status(200).send(auth)
  } catch (error) {
    if (error instanceof InvalidCredentialsException) {
      res.status(400).send({ message: 'Credentials not found!😓' })
    }

    throw error
  }
}
