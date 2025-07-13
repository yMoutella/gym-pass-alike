import { Checkin, Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { CheckinRepository } from '../checkin-repository'

export class PrismaCheckinsRepository implements CheckinRepository {
  async save(checkin: Checkin): Promise<Checkin> {
    return await prisma.checkin.update({
      where: { id: checkin.id },
      data: checkin,
    })
  }
  async create(data: Prisma.CheckinUncheckedCreateInput): Promise<Checkin> {
    return await prisma.checkin.create({
      data,
    })
  }

  async findById(id: string): Promise<Checkin | null> {
    return await prisma.checkin.findUnique({
      where: { id },
    })
  }

  async findManyByUserId(userId: string, page: number): Promise<Checkin[]> {
    return await prisma.checkin.findMany({
      where: { user_id: userId },
      take: 20,
      skip: (page - 1) * 20,
    })
  }

  async countByUserId(userId: string): Promise<number> {
    return await prisma.checkin.count({
      where: { user_id: userId },
    })
  }

  async findByUserIdOnDate(
    userId: string,
    date: Date,
  ): Promise<Checkin | null> {
    return await prisma.checkin.findFirst({
      where: {
        user_id: userId,
        created_at: date,
      },
    })
  }
}
