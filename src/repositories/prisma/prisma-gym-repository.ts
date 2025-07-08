import { Gym, Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { GymRepository } from '../gym-repository'

export class PrismaGymRepository implements GymRepository {
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
