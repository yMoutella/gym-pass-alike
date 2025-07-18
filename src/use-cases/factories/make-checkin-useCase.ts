import { PrismaCheckinsRepository } from '@/repositories/prisma/prisma-checkins-repository'
import { CheckinUseCase } from '../checkin/checkin'
import { PrismaGymRepository } from '@/repositories/prisma/prisma-gym-repository'

export default function makeCheckinUseCase() {
  const checkInRepository = new PrismaCheckinsRepository()
  const gymRepository = new PrismaGymRepository()
  const checkinUseCase = new CheckinUseCase(checkInRepository, gymRepository)

  return checkinUseCase
}
