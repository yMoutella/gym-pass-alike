import { CheckinUseCase } from './checkin'
import InMemoryCheckinRepository from '@/repositories/in-memory/in-memory-checkins'
// import { PrismaCheckinsRepository } from '@/repositories/prisma/prisma-checkins-repository'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

let sut: CheckinUseCase
let repository: InMemoryCheckinRepository
// let repository: PrismaCheckinsRepository

describe('User Check-in Use Case', () => {
  beforeEach(() => {
    // repository = new PrismaCheckinsRepository()
    repository = new InMemoryCheckinRepository()
    sut = new CheckinUseCase(repository)
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to create a check-in', async () => {
    const { checkIn } = await sut.create({
      userId: 'b129b015-9413-474a-86f0-cb37c5efea51',
      gymId: 'a09e2ae3-a01a-4f3d-8d4b-034bb3efa2f8',
    })

    expect(checkIn).toHaveProperty('id')
    expect(checkIn.user_id).toEqual('b129b015-9413-474a-86f0-cb37c5efea51')
    expect(checkIn.gym_id).toEqual('a09e2ae3-a01a-4f3d-8d4b-034bb3efa2f8')
  })

  it('should not be able to check-in twice', async () => {
    vi.setSystemTime(new Date(2025, 6, 7, 0, 0, 0))

    await sut.create({
      userId: 'user-01',
      gymId: 'gym-01',
    })

    await expect(
      async () =>
        await sut.create({
          userId: 'user-01',
          gymId: 'gym-01',
        }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should not be able to check-in in different days', async () => {
    vi.setSystemTime(new Date(2025, 6, 7, 0, 0, 0))

    await sut.create({
      userId: 'user-01',
      gymId: 'gym-01',
    })

    vi.setSystemTime(new Date(2025, 6, 8, 0, 0, 0))

    const { checkIn } = await sut.create({
      userId: 'user-01',
      gymId: 'gym-01',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
