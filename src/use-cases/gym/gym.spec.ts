import { beforeEach, describe, expect, it } from 'vitest'
import { GymUseCase } from './gym'
import InMemoryGymRepository from '@/repositories/in-memory/in-memory-gym-repository'
import { ResourceNotFoundException } from '../errors/resource-not-found'

let inMemory: InMemoryGymRepository
let sut: GymUseCase

describe('Register use case', () => {
  beforeEach(() => {
    inMemory = new InMemoryGymRepository()
    sut = new GymUseCase(inMemory)
  })
  it('should be able to create a new gym', async () => {
    const { gym } = await sut.create({
      title: 'Rats GYM',
      description: 'Rats GYM description',
      phone: '1234567890',
      latitude: -27.2092052,
      longitude: -49.6401091,
    })

    expect(gym.title).toEqual(expect.any(String))
    expect(gym.description).toEqual(expect.any(String))
    expect(gym.phone).toEqual(expect.any(String))
    expect(gym.latitude.toString()).toEqual(expect.any(String))
    expect(gym.longitude.toString()).toEqual(expect.any(String))
  })

  it('should be able to find a gym given gym id', async () => {
    const { gym: createdGym } = await sut.create({
      title: 'Rats GYM',
      description: 'Rats GYM description',
      phone: '1234567890',
      latitude: -27.2092052,
      longitude: -49.6401091,
    })

    const { gym } = await sut.findGym(createdGym.id)

    expect(gym.title).toEqual(expect.any(String))
    expect(gym.description).toEqual(expect.any(String))
    expect(gym.phone).toEqual(expect.any(String))
    expect(gym.latitude.toString()).toEqual(expect.any(String))
    expect(gym.longitude.toString()).toEqual(expect.any(String))
  })

  it('should return a Resource not found error for invalid gym id', async () => {
    await sut.create({
      title: 'Rats GYM',
      description: 'Rats GYM description',
      phone: '1234567890',
      latitude: -27.2092052,
      longitude: -49.6401091,
    })

    await expect(async () => await sut.findGym('1i')).rejects.toBeInstanceOf(
      ResourceNotFoundException,
    )
  })
})
