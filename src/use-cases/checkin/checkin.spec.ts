import { CheckinUseCase } from './checkin'
import InMemoryCheckinRepository from '@/repositories/in-memory/in-memory-checkins'
import { beforeEach, describe, expect, it } from 'vitest'

let sut: CheckinUseCase
let repository: InMemoryCheckinRepository

describe('User Check-in Use Case', () => {
  beforeEach(() => {
    repository = new InMemoryCheckinRepository()
    sut = new CheckinUseCase(repository)
  })
  it('should be able to create a check-in', async () => {
    const { checkIn } = await sut.create({
      userId: 'user-01',
      gymId: 'gym-01',
    })

    expect(checkIn).toHaveProperty('id')
    expect(checkIn.user_id).toEqual('user-01')
    expect(checkIn.gym_id).toEqual('gym-01')
  })
})
