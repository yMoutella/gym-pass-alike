import { PrismaCheckinsRepository } from '@/repositories/prisma/prisma-checkins-repository'
import { CheckinUseCase } from '../checkin/checkin'

export default function makeCheckinUseCase() {
  const repository = new PrismaCheckinsRepository()
  const checkinUseCase = new CheckinUseCase(repository)

  return checkinUseCase
}
