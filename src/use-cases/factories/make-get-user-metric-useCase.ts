import { PrismaCheckinsRepository } from '@/repositories/prisma/prisma-checkins-repository'
import { GetUserMetricsUseCase } from '../checkin/get-user-metric'

export default function makeGetUserMetricUseCase() {
  const checkInRepository = new PrismaCheckinsRepository()
  const useCase = new GetUserMetricsUseCase(checkInRepository)
  return useCase
}
