import PrismaUserRepository from '@/repositories/prisma/prisma-users-repository'
import { describe, expect, it, test } from 'vitest'
import { RegisterUseCase } from './register'
import { compare, hash } from 'bcryptjs'
import InMemoryUserRepository from '@/repositories/in-memory/in-memory-repository'

describe('Register use case', () => {
  it('should hash a user password upon registration', async () => {
    const inMemory = new InMemoryUserRepository()
    const userUseCase = new RegisterUseCase(inMemory)

    const { user } = await userUseCase.create({
      name: 'John doe',
      email: 'johndoe@johnland.com',
      password: '1222323329080',
    })

    const isPasswordHashed = await compare('1222323329080', user.password_hash)
    expect(isPasswordHashed).toBe(true)
  })
})
