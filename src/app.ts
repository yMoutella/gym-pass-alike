import fastify from 'fastify'
import { routes } from './http/routes'
import { ZodError } from 'zod'

export const app = fastify()

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
