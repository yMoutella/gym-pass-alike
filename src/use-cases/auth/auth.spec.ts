import InMemoryUserRepository from '@/repositories/in-memory/in-memory-repository'
import { beforeEach, describe, expect, expectTypeOf, it } from 'vitest'
import { AuthUseCase } from './auth'
import { hash } from 'bcryptjs'
import { InvalidCredentialsException } from '../errors/invalid-credentials-exception'

let usersRepository: InMemoryUserRepository
let sut: AuthUseCase

describe('User should authenticate', async () => {
  beforeEach(() => {
    usersRepository = new InMemoryUserRepository()
    sut = new AuthUseCase(usersRepository)
  })
  it('User should be able to authenticate', async () => {
    const hashed = await hash('passwordTest', 6)

    await usersRepository.create({
      name: 'John doe',
      email: 'johndoe@johnland.com',
      password_hash: hashed,
    })

    const response = await sut.execute({
      email: 'johndoe@johnland.com',
      password: 'passwordTest',
    })

    expect(response).toBe(response)
  })

  it('User should not be able to authenticate with invalid credentials', async () => {
    const user = {
      name: 'John doe',
      email: 'johndoe@johnland.com',
      password: 'passwordTest',
    }

    await usersRepository.create({
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
