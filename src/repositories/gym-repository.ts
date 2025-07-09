import { Gym, Prisma } from '@prisma/client'

export interface FindManyNearUserParams {
  latitude: number
  longitude: number
}

export interface GymRepository {
  create(data: Prisma.GymCreateInput): Promise<Gym>
  findById(gymId: string): Promise<Gym | null>
  findByName(gymTitle: string, page: number): Promise<Gym[] | null>
  findManyNearUser(params: FindManyNearUserParams, page: number): Promise<Gym[]>
}
