import { UsersRepository } from '@/repositories/users-repository'
import { Checkin, User } from '@prisma/client'
import { ResourceNotFoundException } from '../errors/resource-not-found'
import { CheckinRepository } from '@/repositories/checkin-repository'

interface CheckinUseCaseRequest {
  userId: string
  gymId: string
}

interface CheckinUseCaseResponse {
  checkIn: Checkin
}

export class CheckinUseCase {
  constructor(private checkinRepository: CheckinRepository) {}

  async create({
    userId,
    gymId,
  }: CheckinUseCaseRequest): Promise<CheckinUseCaseResponse> {
    const checkIn = await this.checkinRepository.create({
      user_id: userId,
      gym_id: gymId,
    })

    return {
      checkIn,
    }
  }
}
