import InMemoryCheckinRepository from '@/repositories/in-memory/in-memory-checkins'
import { GetUserMetricsUseCase } from './get-user-metric'
import { beforeEach, describe, expect, it } from 'vitest'

let sut: GetUserMetricsUseCase
let checkinRepository: InMemoryCheckinRepository

describe('Get user checkins metric', () => {
  beforeEach(async () => {
    checkinRepository = new InMemoryCheckinRepository()
    sut = new GetUserMetricsUseCase(checkinRepository)
  })

  it('Should be able to get checkins count metric', async () => {
    await checkinRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    await checkinRepository.create({
      gym_id: 'gym-02',
      user_id: 'user-01',
    })

    const { checkinsCount } = await sut.execute({
      userId: 'user-01',
    })

    expect(checkinsCount).toEqual(2)
  })
})
