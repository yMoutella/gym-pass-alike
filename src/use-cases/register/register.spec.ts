import { beforeEach, describe, expect, expectTypeOf, it } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import InMemoryUserRepository from '@/repositories/in-memory/in-memory-repository'
import { UserDuplicatedException } from '../errors/user-duplicated-exception'

let inMemory: InMemoryUserRepository
let userUseCase: RegisterUseCase

describe('Register use case', () => {
  beforeEach(() => {
    inMemory = new InMemoryUserRepository()
    userUseCase = new RegisterUseCase(inMemory)
  })
  it('should hash a user password upon registration', async () => {
    const { user } = await userUseCase.create({
      name: 'John doe',
      email: 'johndoe@johnland.com',
      password: '1222323329080',
    })

    const isPasswordHashed = await compare('1222323329080', user.password_hash)
    expect(isPasswordHashed).toBe(true)
  })

  it('should not be able to register twice the same user', async () => {
    await userUseCase.create({
      name: 'John doe',
      email: 'johndoe@johnland.com',
      password: '1222323329080',
    })

    await expect(async () => {
      await userUseCase.create({
        name: 'John doe', 
        email: 'johndoe@johnland.com',
        password: '1222323329080',
      })
    }).rejects.toBeInstanceOf(UserDuplicatedException)
  })

  it('should be able to register user', async () => {
    const { user } = await userUseCase.create({
      name: 'John doe',
      email: 'johndoe@johnland.com',
      password: '1222323329080',
    })

    expectTypeOf(user).toHaveProperty('name').toBeString()
    expectTypeOf(user).toHaveProperty('id').toBeString()
    expectTypeOf(user).toHaveProperty('password_hash').toBeString()
  })
})
