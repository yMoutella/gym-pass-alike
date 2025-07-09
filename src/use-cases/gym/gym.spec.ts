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

    expect(gym!.title).toEqual(expect.any(String))
    expect(gym!.description).toEqual(expect.any(String))
    expect(gym!.phone).toEqual(expect.any(String))
    expect(gym!.latitude.toString()).toEqual(expect.any(String))
    expect(gym!.longitude.toString()).toEqual(expect.any(String))
  })

  it('should be able to find a gym given gym id', async () => {
    const { gym: createdGym } = await sut.create({
      title: 'Rats GYM',
      description: 'Rats GYM description',
      phone: '1234567890',
      latitude: -27.2092052,
      longitude: -49.6401091,
    })

    const { gym } = await sut.findGym(createdGym!.id)

    expect(gym!.title).toEqual(expect.any(String))
    expect(gym!.description).toEqual(expect.any(String))
    expect(gym!.phone).toEqual(expect.any(String))
    expect(gym!.latitude.toString()).toEqual(expect.any(String))
    expect(gym!.longitude.toString()).toEqual(expect.any(String))
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

  it('Should be able to find gym by name', async () => {
    await inMemory.create({
      title: 'Rats',
      description: 'Rats GYM description',
      phone: '1234567890',
      latitude: -28.2092052,
      longitude: -49.6401091,
    })

    await inMemory.create({
      title: 'Rats 2',
      description: 'Rats GYM description',
      phone: '1234567890',
      latitude: -28.2092052,
      longitude: -49.6401091,
    })

    await inMemory.create({
      title: 'Rats 3',
      description: 'Rats GYM description',
      phone: '1234567890',
      latitude: -28.2092052,
      longitude: -49.6401091,
    })

    await inMemory.create({
      title: 'Diff Name',
      description: 'Rats GYM description',
      phone: '1234567890',
      latitude: -28.2092052,
      longitude: -49.6401091,
    })

    const { gyms } = await sut.findGymByName('Rats', 1)

    expect(gyms).toHaveLength(3)
    expect(gyms).toEqual([
      expect.objectContaining({
        id: expect.any(String),
        title: expect.any(String),
        description: expect.any(String),
      }),
      expect.objectContaining({
        id: expect.any(String),
        title: expect.any(String),
        description: expect.any(String),
      }),
      expect.objectContaining({
        id: expect.any(String),
        title: expect.any(String),
        description: expect.any(String),
      }),
    ])
  })

  it('should return a nearby gyms ', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemory.create({
        title: `Rats GYM ${1}`,
        description: 'Rats GYM description',
        phone: '1234567890',
        latitude: -22.8848265,
        longitude: -43.5590793,
      })
    }

    const { gyms } = await sut.findManyNearUser(
      {
        latitude: -22.8855958,
        longitude: -43.5571539,
      },
      1,
    )

    expect(gyms).toHaveLength(20)
  })
  it('should return no nearby gyms ', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemory.create({
        title: `Rats GYM ${1}`,
        description: 'Rats GYM description',
        phone: '1234567890',
        latitude: -22.8848265,
        longitude: -43.5590793,
      })
    }

    const { gyms } = await sut.findManyNearUser(
      {
        latitude: -102.8855958,
        longitude: -53.5571539,
      },
      1,
    )

    expect(gyms).toHaveLength(0)
  })
})
