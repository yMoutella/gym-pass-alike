import InMemoryUserRepository from '@/repositories/in-memory/in-memory-repository'
import { describe, expect, expectTypeOf, it } from 'vitest'
import { AuthUseCase } from './auth'
import { hash } from 'bcryptjs'
import { InvalidCredentialsException } from '../errors/invalid-credentials-exception'
import { beforeEach } from 'node:test'

let usersRepository: InMemoryUserRepository
let sut: AuthUseCase

describe('User should authenticate', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUserRepository()
    sut = new AuthUseCase(usersRepository)
  })
  it('User should be able to authenticate', async () => {
    const hashed = await hash('passwordTest', 6)

    const user = await usersRepository.create({
      name: 'John doe',
      email: 'johndoe@johnland.com',
      password_hash: hashed,
    })

    const response = await sut.execute({
      email: 'Johndoe@johnland.com',
      password: 'passwordTest',
    })

    expectTypeOf(response).toHaveProperty('user').toBeObject()
  })

  it('User should not be able to authenticate with invalid credentials', async () => {
    const userRepository = new InMemoryUserRepository()
    const sut = new AuthUseCase(userRepository)

    const user = {
      name: 'John doe',
      email: 'johndoe@johnland.com',
      password: 'passwordTest',
    }

    await userRepository.create({
      name: user.name,
      email: user.email,
      password_hash: await hash(user.password, 6),
    })

    await expect(async () => {
      await sut.execute({
        email: 'dummy@email.com',
        password: 'password123',
      })
    }).rejects.toBeInstanceOf(InvalidCredentialsException)
  })
})
