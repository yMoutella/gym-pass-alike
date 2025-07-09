import { UserHistoryUseCase } from './user-history'
import InMemoryCheckinRepository from '@/repositories/in-memory/in-memory-checkins'
import { beforeEach, describe, expect, it } from 'vitest'

let sut: UserHistoryUseCase
let checkinRepository: InMemoryCheckinRepository

describe('User checkins history', () => {
  beforeEach(async () => {
    checkinRepository = new InMemoryCheckinRepository()
    sut = new UserHistoryUseCase(checkinRepository)
  })

  it('Should be able to retrieve user history', async () => {
    await checkinRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    await checkinRepository.create({
      gym_id: 'gym-02',
      user_id: 'user-01',
    })

    const { checkins } = await sut.execute({
      userId: 'user-01',
      page: 1,
    })

    expect(checkins).toHaveLength(2)
    expect(checkins).toEqual([
      expect.objectContaining({ gym_id: 'gym-01' }),
      expect.objectContaining({ gym_id: 'gym-02' }),
    ])
  })

  it('Should be able to retrieve paginated user history', async () => {
    for (let i = 1; i <= 22; i++) {
      await checkinRepository.create({
        gym_id: `gym-${i}`,
        user_id: 'user-01',
      })
    }

    const { checkins } = await sut.execute({
      userId: 'user-01',
      page: 2,
    })

    console.log(checkins)

    expect(checkins).toHaveLength(2)
    expect(checkins).toEqual([
      expect.objectContaining({ gym_id: 'gym-21' }),
      expect.objectContaining({ gym_id: 'gym-22' }),
    ])
  })
})
