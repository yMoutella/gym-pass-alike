import { CheckinRepository } from '@/repositories/checkin-repository'
import { Checkin } from '@prisma/client'

interface UserHistoryUseCaseRequest {
  userId: string
  page: number
}

interface UserHistoryUseCaseResponse {
  checkins: Checkin[]
}

export class UserHistoryUseCase {
  constructor(private checkinRepository: CheckinRepository) {}

  async execute(
    request: UserHistoryUseCaseRequest,
  ): Promise<UserHistoryUseCaseResponse> {
    const { userId, page } = request

    const checkins = await this.checkinRepository.findManyByUserId(userId, page)

    return {
      checkins,
    }
  }
}
