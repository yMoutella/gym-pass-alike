import { PrismaCheckinsRepository } from '@/repositories/prisma/prisma-checkins-repository'
import { UserHistoryUseCase } from '../checkin/user-history'

export default function makeUserHistoryUseCase() {
  const checkInRepository = new PrismaCheckinsRepository()
  const useCase = new UserHistoryUseCase(checkInRepository)
  return useCase
}
