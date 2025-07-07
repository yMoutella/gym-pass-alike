import { Checkin, Prisma, User } from '@prisma/client'
import { CheckinRepository } from '../checkin-repository'
import { randomUUID } from 'crypto'

export default class InMemoryCheckinRepository implements CheckinRepository {
  private items: Checkin[] = []

  create(data: Prisma.CheckinUncheckedCreateInput): Promise<Checkin> {
    const checkIn: Checkin = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      created_at: new Date(),
      validated_at: data.validated_at ? new Date() : null,
    }

    this.items.push(checkIn)

    return Promise.resolve(checkIn)
  }
  findById(id: string): Promise<Checkin | null> {
    throw new Error('Method not implemented.')
  }
  findManyByUserId(userId: string, page: number): Promise<Checkin[]> {
    throw new Error('Method not implemented.')
  }
  countByUserId(userId: string): Promise<number> {
    throw new Error('Method not implemented.')
  }
  findByUserIdOnDate(userId: string, date: Date): Promise<Checkin | null> {
    throw new Error('Method not implemented.')
  }
}
