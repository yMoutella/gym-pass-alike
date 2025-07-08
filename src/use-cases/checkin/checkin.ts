import { Checkin } from '@prisma/client'
import { CheckinRepository } from '@/repositories/checkin-repository'
import { GymRepository } from '@/repositories/gym-repository'
import { ResourceNotFoundException } from '../errors/resource-not-found'
import { getDistance } from 'geolib'
import GymToDistantException from '../errors/gym-to-distant-exception'

interface CheckinUseCaseRequest {
  userId: string
  gymId: string
  userLatitude: number
  userLongitude: number
}

interface CheckinUseCaseResponse {
  checkIn: Checkin
}

export class CheckinUseCase {
  constructor(
    private checkinRepository: CheckinRepository,
    private gymRepository: GymRepository,
  ) {}

  async create({
    userId,
    gymId,
    userLatitude,
    userLongitude,
  }: CheckinUseCaseRequest): Promise<CheckinUseCaseResponse> {
    const gym = await this.gymRepository.findById(gymId)

    if (!gym) {
      throw new ResourceNotFoundException()
    }

    const distance = getDistance(
      { latitude: userLatitude, longitude: userLongitude },
      {
        latitude: gym.latitude.toNumber(),
        longitude: gym.longitude.toNumber(),
      },
      0.01,
    )

    if (distance > 100) {
      throw new GymToDistantException()
    }

    const checkinOnSameDate = await this.checkinRepository.findByUserIdOnDate(
      userId,
      new Date(),
    )

    if (checkinOnSameDate) {
      throw new Error()
    }

    const checkIn = await this.checkinRepository.create({
      user_id: userId,
      gym_id: gymId,
    })

    return {
      checkIn,
    }
  }
}
