import { Checkin, Prisma } from '@prisma/client'
import { CheckinRepository } from '../checkin-repository'
import { randomUUID } from 'crypto'
import dayjs from 'dayjs'

export default class InMemoryCheckinRepository implements CheckinRepository {
  private items: Checkin[] = []

  countByUserId(userId: string): Promise<number> {
    const filtered = this.items.filter((checkin) => checkin.user_id === userId)
    return Promise.resolve(filtered.length)
  }

  findManyByUserId(userId: string, page: number): Promise<Checkin[]> {
    return Promise.resolve(
      this.items
        .filter((checkin) => checkin.user_id === userId)
        .slice((page - 1) * 20, page * 20),
    )
  }

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

  findByUserIdOnDate(userId: string, date: Date): Promise<Checkin | null> {
    const startOfDay = dayjs(date).startOf('date')
    const endOfDay = dayjs(date).endOf('date')

    const findUserOnDate = this.items.find((checkin) => {
      const checkInDate = dayjs(checkin.created_at)
      const isOnSameDate =
        (checkInDate.isSame(startOfDay) || checkInDate.isAfter(startOfDay)) &&
        checkInDate.isBefore(endOfDay)

      return checkin.user_id === userId && isOnSameDate
    })

    if (findUserOnDate) {
      return Promise.resolve(findUserOnDate)
    }

    return Promise.resolve(null)
  }
}
