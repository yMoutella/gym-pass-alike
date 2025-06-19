import fastify from 'fastify'
import { registerRoute } from './http/routes/register.route'

export const app = fastify()

app.register(registerRoute)
