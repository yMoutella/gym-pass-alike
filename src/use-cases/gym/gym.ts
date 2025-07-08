import { GymRepository } from '@/repositories/gym-repository'
import { Gym } from '@prisma/client'
import { ResourceNotFoundException } from '../errors/resource-not-found'

interface GymRequestInterface {
  title: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
}
interface GymResponseInterface {
  gym: Gym
}

export class GymUseCase {
  constructor(private readonly gymRepository: GymRepository) {}

  async create(data: GymRequestInterface): Promise<GymResponseInterface> {
    const gym = await this.gymRepository.create({
      title: data.title,
      description: data.description,
      latitude: data.latitude,
      longitude: data.longitude,
      phone: data.phone,
    })

    return {
      gym,
    }
  }

  async findGym(gymId: string): Promise<GymResponseInterface> {
    const gym = await this.gymRepository.findById(gymId)

    if (!gym) {
      throw new ResourceNotFoundException()
    }

    return {
      gym,
    }
  }
}
