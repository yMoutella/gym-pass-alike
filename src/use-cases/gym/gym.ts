import {
  FindManyNearUserParams,
  GymRepository,
} from '@/repositories/gym-repository'
import { Gym } from '@prisma/client'
import { ResourceNotFoundException } from '../errors/resource-not-found'

interface GymRequestInterface {
  title: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
  page?: number
}
interface GymResponseInterface {
  gym?: Gym
  gyms?: Gym[]
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

  //params = {latitude, longitude}
  async findManyNearUser(
    params: FindManyNearUserParams,
    page: number,
  ): Promise<GymResponseInterface> {
    const gyms = await this.gymRepository.findManyNearUser(params, page)
    return {
      gyms,
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

  async findGymByName(
    gymTitle: string,
    page: number,
  ): Promise<GymResponseInterface> {
    const gyms = await this.gymRepository.findByName(gymTitle, page)

    if (!gyms) {
      throw new ResourceNotFoundException()
    }

    return {
      gyms,
    }
  }
}
