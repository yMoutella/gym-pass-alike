import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  JWT_SECRET: z.string().min(1),
  NODE_ENV: z.enum(['dev', 'prd', 'test']).default('dev'),
  DATABASE_URL: z.string().min(1),
})

const _env = envSchema.safeParse(process.env)
if (!_env.success) {
  console.error('Invalid environment variables:', _env.error.format())
  throw new Error('Invalid environment variables')
}

export const env = _env.data
export type Env = z.infer<typeof envSchema>
