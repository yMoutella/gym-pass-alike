import fastify from 'fastify'
import { routes } from './http/routes'
import { ZodError } from 'zod'
import fastifyJwt from '@fastify/jwt'
import { env } from './env'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.register(routes)

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
