import { CheckinUseCase } from './checkin'
import InMemoryCheckinRepository from '@/repositories/in-memory/in-memory-checkins'
import InMemoryGymRepository from '@/repositories/in-memory/in-memory-gym-repository'
import { Decimal } from '@prisma/client/runtime/library'
// import { PrismaCheckinsRepository } from '@/repositories/prisma/prisma-checkins-repository'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import GymToDistantException from '../errors/gym-to-distant-exception'
import { ResourceNotFoundException } from '../errors/resource-not-found'
import CheckinTimeException from '../errors/checkin-time-exception'

let sut: CheckinUseCase
let checkinRepository: InMemoryCheckinRepository
let gymRepository: InMemoryGymRepository

describe('User Check-in Use Case', () => {
  beforeEach(async () => {
    checkinRepository = new InMemoryCheckinRepository()
    gymRepository = new InMemoryGymRepository()
    sut = new CheckinUseCase(checkinRepository, gymRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to create a check-in', async () => {
    await gymRepository.create({
      id: 'gym-1',
      latitude: 0,
      longitude: 0,
      title: 'Rats academy',
      description: 'Description of the gym',
    })

    const { checkIn } = await sut.create({
      userId: 'b129b015-9413-474a-86f0-cb37c5efea51',
      gymId: 'gym-1',
      userLatitude: 0,
      userLongitude: 0,
    })

    expect(checkIn).toHaveProperty('id')
    expect(checkIn.user_id).toEqual('b129b015-9413-474a-86f0-cb37c5efea51')
    expect(checkIn.gym_id).toEqual('gym-1')
  })

  it('should not be able to check-in twice', async () => {
    vi.setSystemTime(new Date(2025, 6, 7, 0, 0, 0))

    await gymRepository.create({
      id: 'gym-1',
      latitude: 0,
      longitude: 0,
      title: 'Rats academy',
      description: 'Description of the gym',
    })

    await sut.create({
      userId: 'user-01',
      gymId: 'gym-1',
      userLatitude: 0,
      userLongitude: 0,
    })

    await expect(async () => {
      await sut.create({
        userId: 'user-01',
        gymId: 'gym-1',
        userLatitude: 0,
        userLongitude: 0,
      })
    }).rejects.toBeInstanceOf(Error)
  })

  it('should be able to check-in in different days', async () => {
    vi.setSystemTime(new Date(2025, 6, 7, 0, 0, 0))

    await gymRepository.create({
      id: 'gym-1',
      latitude: 0,
      longitude: 0,
      title: 'Rats academy',
      description: 'Description of the gym',
    })

    await sut.create({
      userId: 'user-01',
      gymId: 'gym-1',
      userLatitude: 0,
      userLongitude: 0,
    })

    vi.setSystemTime(new Date(2025, 6, 8, 0, 0, 0))

    const { checkIn } = await sut.create({
      userId: 'user-01',
      gymId: 'gym-1',
      userLatitude: 0,
      userLongitude: 0,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not to be able to check-in in distante gyms', async () => {
    vi.setSystemTime(new Date(2025, 6, 7, 0, 0, 0))

    await gymRepository.create({
      id: 'gym-2',
      latitude: new Decimal(-22.8781892),
      longitude: new Decimal(-43.5703048),
      title: 'Rats academy',
      description: 'Description of the gym',
    })

    await expect(
      async () =>
        await sut.create({
          userId: 'user-01',
          gymId: 'gym-2',
          userLatitude: -1002.8781892,
          userLongitude: -100.5703048,
        }),
    ).rejects.toBeInstanceOf(GymToDistantException)
  })

  it('should be able to validate a checkin', async () => {
    await gymRepository.create({
      id: 'gym-2',
      latitude: new Decimal(-22.8781892),
      longitude: new Decimal(-43.5703048),
      title: 'Rats academy',
      description: 'Description of the gym',
    })

    const { checkIn } = await sut.create({
      userId: 'user-01',
      gymId: 'gym-2',
      userLatitude: -22.8781892,
      userLongitude: -43.5703048,
    })

    const { checkIn: validated } = await sut.validate(checkIn.id)

    expect(validated.validated_at).toEqual(expect.any(Date))
  })

  it('should not be able to validate a checkin', async () => {
    await expect(
      async () => await sut.validate('ckId-2'),
    ).rejects.toBeInstanceOf(ResourceNotFoundException)
  })

  it('should not be able to validate checkin after 20 minutes', async () => {
    vi.setSystemTime(new Date(2025, 6, 7, 0, 10, 0))

    const fakeCheckin = await checkinRepository.create({
      gym_id: 'Rats',
      user_id: 'user-1',
      id: 'ck-1',
      created_at: new Date(),
    })

    vi.setSystemTime(new Date(2025, 6, 7, 0, 45, 0))

    await expect(
      async () => await sut.validate(fakeCheckin.id),
    ).rejects.toBeInstanceOf(CheckinTimeException)
  })

  it('should  be able to validate checkin between 20 minutes', async () => {
    vi.setSystemTime(new Date(2025, 6, 7, 0, 10, 0))

    const fakeCheckin = await checkinRepository.create({
      gym_id: 'Rats',
      user_id: 'user-1',
      id: 'ck-1',
      created_at: new Date(),
    })

    vi.setSystemTime(new Date(2025, 6, 7, 0, 15, 0))
    const { checkIn: validated } = await sut.validate(fakeCheckin.id)

    expect(validated.validated_at).toEqual(expect.any(Date))
  })
})
