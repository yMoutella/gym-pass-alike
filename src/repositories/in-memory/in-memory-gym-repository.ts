import { Gym, Prisma } from '@prisma/client'
import { GymRepository } from '../gym-repository'
import { Decimal } from '@prisma/client/runtime/library'

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
}
