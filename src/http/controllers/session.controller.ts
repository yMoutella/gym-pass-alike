import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { InvalidCredentialsException } from '@/use-cases/errors/invalid-credentials-exception'
import makeAuthUseCase from '@/use-cases/factories/make-auth-useCase'

export async function session(req: FastifyRequest, res: FastifyReply) {
  const authSchema = z.object({
    email: z.string(),
    password: z.string().min(6),
  })

  const { email, password } = authSchema.parse(req.body)

  try {
    const authUseCase = makeAuthUseCase()
    const { user } = await authUseCase.execute({ email, password })

    const token = await res.jwtSign(
      {},
      {
        sub: user.id,
      },
    )

    return res.status(200).send({
      token,
    })
  } catch (error) {
    if (error instanceof InvalidCredentialsException) {
      res.status(400).send({ message: 'Credentials not found!😓' })
    }

    throw error
  }
}
