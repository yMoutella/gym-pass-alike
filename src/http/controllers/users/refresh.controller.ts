import { FastifyReply } from 'fastify/types/reply'
import { FastifyRequest } from 'fastify/types/request'

export async function refresh(req: FastifyRequest, res: FastifyReply) {
  try {
    await req.jwtVerify({ onlyCookie: true })
  } catch (error) {
    return res.status(401).send({ message: 'Unauthorized 🚫' })
  }

  const token = await res.jwtSign(
    {},
    {
      sub: req.user.sub,
    },
  )

  const refreshToken = await res.jwtSign(
    {},
    {
      sub: req.user.sub,
      expiresIn: '7d',
    },
  )

  return res
    .status(200)
    .setCookie('refreshToken', refreshToken, {
      path: '/',
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
    })
    .send({
      token,
    })
}
