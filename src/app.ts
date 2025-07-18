import { usersRoutes } from './http/controllers/users/routes'
import { gymRoutes } from './http/controllers/gyms/routes'
import { env } from './env'

import fastify from 'fastify'
import { ZodError } from 'zod'
import fastifyJwt from '@fastify/jwt'
import checkinRoutes from './http/controllers/checkin/routes'
import fastifyCookie from '@fastify/cookie'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
})
app.register(fastifyCookie)

app.register(usersRoutes)
app.register(gymRoutes)
app.register(checkinRoutes)

app.setErrorHandler((err, req, res) => {
  if (err instanceof ZodError) {
    return res.status(400).send({
      message: 'Validation error!🚫',
      issues: err.format(),
    })
  } else {
    console.log(err.message)
    return res.status(500).send('Internal server error! ⚠️')
  }
})
