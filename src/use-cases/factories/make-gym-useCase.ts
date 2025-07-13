import { PrismaGymRepository } from '@/repositories/prisma/prisma-gym-repository'
import { GymUseCase } from '../gym/gym'

export default function makeGetGymUseCase() {
  const gymRepository = new PrismaGymRepository()
  const useCase = new GymUseCase(gymRepository)
  return useCase
}
