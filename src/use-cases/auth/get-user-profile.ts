import { UsersRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'
import { ResourceNotFoundException } from '../errors/resource-not-found'

interface AuthUseCaseRequest {
  userId: string
}

interface GetUseCaseResponse {
  user: User
}

export class GetProfileUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ userId }: AuthUseCaseRequest): Promise<GetUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundException()
    }

    return {
      user,
    }
  }
}
