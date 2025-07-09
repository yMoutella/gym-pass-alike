import { Checkin, Prisma } from '@prisma/client'

export interface CheckinRepository {
  create(data: Prisma.CheckinUncheckedCreateInput): Promise<Checkin>
  save(checkin: Checkin): Promise<Checkin>
  findById(checkInId: string): Promise<Checkin | null>
  findByUserIdOnDate(userId: string, date: Date): Promise<Checkin | null>
  findManyByUserId(userId: string, page: number): Promise<Checkin[]>
  countByUserId(userId: string): Promise<number>
}
