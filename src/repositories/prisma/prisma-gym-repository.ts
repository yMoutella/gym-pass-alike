import { Gym, Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { FindManyNearUserParams, GymRepository } from '../gym-repository'

export class PrismaGymRepository implements GymRepository {
  async findByName(gymTitle: string, page: number): Promise<Gym[]> {
    const gyms = await prisma.gym.findMany({
      where: {
        title: {
          startsWith: gymTitle,
          mode: 'insensitive',
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return gyms
  }
  async findManyNearUser(
    { latitude, longitude }: FindManyNearUserParams,
    page: number,
  ): Promise<Gym[]> {
    const gyms = await prisma.$queryRaw<Gym[]>`
      SELECT * from gyms
      WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
      LIMIT 20 OFFSET ${(page - 1) * 20}
      `
    return gyms
  }
  async create(data: Prisma.GymCreateInput): Promise<Gym> {
    return await prisma.gym.create({
      data,
    })
  }
  async findById(gymId: string): Promise<Gym | null> {
    const gym = await prisma.gym.findUnique({
      where: {
        id: gymId,
      },
    })
    return gym
  }
}
