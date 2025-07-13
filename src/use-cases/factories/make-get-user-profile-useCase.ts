import PrismaUserRepository from '@/repositories/prisma/prisma-users-repository'
import { GetProfileUseCase } from '../auth/get-user-profile'

export default function makeGetUserProfileUseCase() {
  const userRepository = new PrismaUserRepository()
  const useCase = new GetProfileUseCase(userRepository)
  return useCase
}
