import { UsersRepository } from '@/repositories/users-repository'
import { InvalidCredentialsException } from '../errors/invalid-credentials-exception'
import { compare } from 'bcryptjs'
import { User } from '@prisma/client'

interface AuthUseCaseRequest {
  email: string
  password: string
}

interface AuthUseCaseResponse {
  user: User
}

export class AuthUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AuthUseCaseRequest): Promise<AuthUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsException()
    }

    const doesPasswordMatch = await compare(password, user.password_hash)

    if (!doesPasswordMatch) {
      throw new InvalidCredentialsException()
    }

    return {
      user,
    }
  }
}
