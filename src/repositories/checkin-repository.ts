import { Checkin, Prisma } from '@prisma/client'

export interface CheckinRepository {
  create(data: Prisma.CheckinUncheckedCreateInput): Promise<Checkin>
  findById(id: string): Promise<Checkin | null>
  findManyByUserId(userId: string, page: number): Promise<Checkin[]>
  countByUserId(userId: string): Promise<number>
  findByUserIdOnDate(userId: string, date: Date): Promise<Checkin | null>
}
