import InMemoryUserRepository from '@/repositories/in-memory/in-memory-repository'
import { GetProfileUseCase } from './get-user-profile'
import { beforeEach, describe, expect, it } from 'vitest'
import { ResourceNotFoundException } from '../errors/resource-not-found'

let usersRepository: InMemoryUserRepository
let sut: GetProfileUseCase

describe('Get user profile feature', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUserRepository()
    sut = new GetProfileUseCase(usersRepository)
  })

  it('should be able to get user profile', async () => {
    const usersRepository = new InMemoryUserRepository()
    const sut = new GetProfileUseCase(usersRepository)

    const user = await usersRepository.create({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password_hash: '123456',
    })

    const { user: userProfile } = await sut.execute({
      userId: user.id,
    })

    expect(userProfile.id).toEqual(user.id)
    expect(userProfile.name).toEqual('John Doe')
    expect(userProfile.email).toEqual('john.doe@example.com')
  })

  it('should not able to get user profile', async () => {
    const usersRepository = new InMemoryUserRepository()
    const sut = new GetProfileUseCase(usersRepository)

    const user = await usersRepository.create({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password_hash: '123456',
    })

    await expect(async () => {
      await sut.execute({
        userId: '12830921',
      })
    }).rejects.toBeInstanceOf(ResourceNotFoundException)
  })
})
