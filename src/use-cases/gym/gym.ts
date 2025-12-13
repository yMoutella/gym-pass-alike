import {
  FindManyNearUserParams,
  GymRepository,
} from '@/repositories/gym-repository'
import { Gym } from '@prisma/client'
import { ResourceNotFoundException } from '../errors/resource-not-found'
import { getDistance, convertDistance } from 'geolib'

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
  gyms?: {
    id: string
    title: string
    description: string | null
    phone: string | null
    distance: number
    unit: 'km' | 'm'
    latitude: number
    longitude: number
  }[]
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
    const gymsResponse: GymResponseInterface['gyms'] = []
    gyms.forEach((gym) => {
      const distance = getDistance(
        { latitude: params.latitude, longitude: params.longitude },
        {
          latitude: gym.latitude.toNumber(),
          longitude: gym.longitude.toNumber(),
        },
      )

      let convertedDistance = convertDistance(distance, 'km')
      let unit: 'km' | 'm' = 'km'

      if (convertedDistance <= 1) {
        convertedDistance = convertDistance(distance, 'm')
        unit = 'm'
      }
      gymsResponse.push({
        id: gym.id,
        title: gym.title,
        description: gym.description,
        phone: gym.phone,
        distance: Number(convertedDistance.toFixed(2)),
        unit: unit,
        latitude: gym.latitude.toNumber(),
        longitude: gym.longitude.toNumber(),
      })
    })

    return {
      gyms: gymsResponse,
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
