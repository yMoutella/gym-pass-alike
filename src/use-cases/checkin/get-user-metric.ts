import { CheckinRepository } from '@/repositories/checkin-repository'

interface GetUserMetricsRequest {
  userId: string
}

interface GetUserMetricsResponse {
  checkinsCount: number
}

export class GetUserMetricsUseCase {
  constructor(private checkinRepository: CheckinRepository) {}

  async execute({
    userId,
  }: GetUserMetricsRequest): Promise<GetUserMetricsResponse> {
    const checkinsCount = await this.checkinRepository.countByUserId(userId)
    return {
      checkinsCount,
    }
  }
}
