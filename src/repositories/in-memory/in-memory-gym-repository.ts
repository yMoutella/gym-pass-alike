import { Gym, Prisma } from '@prisma/client'
import { FindManyNearUserParams, GymRepository } from '../gym-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { getDistance } from 'geolib'

export default class InMemoryGymRepository implements GymRepository {
  items: Gym[] = []

  create(data: Prisma.GymCreateInput): Promise<Gym> {
    const gym = {
      id: data.id ?? crypto.randomUUID(),
      title: data.title,
      phone: data.phone ?? null,
      description: data.description ?? null,
      latitude: new Decimal(data.latitude.toString()),
      longitude: new Decimal(data.longitude.toString()),
    }

    this.items.push(gym)

    return Promise.resolve(gym)
  }

  findById(gymId: string): Promise<Gym | null> {
    const gym = this.items.find((gym) => gym.id === gymId)

    if (!gym) {
      return Promise.resolve(null)
    }

    return Promise.resolve(gym)
  }

  findManyNearUser(
    params: FindManyNearUserParams,
    page: number,
  ): Promise<Gym[]> {
    return Promise.resolve(
      this.items
        .filter((gym) => {
          const distance = getDistance(
            {
              latitude: params.latitude,
              longitude: params.longitude,
            },
            {
              latitude: gym.latitude.toNumber(),
              longitude: gym.longitude.toNumber(),
            },
          )

          return distance <= 5000
        })
        .slice((page - 1) * 20, page * 20),
    )
  }

  findByName(gymTitle: string, page: number): Promise<Gym[] | null> {
    return Promise.resolve(
      this.items
        .filter((gym) => gym.title.includes(gymTitle))
        .slice((page - 1) * 20, page * 20),
    )
  }
}
