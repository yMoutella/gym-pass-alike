import { UsersRepository } from '@/repositories/users-repository'
import { UserDuplicatedException } from '../errors/user-duplicated-exception'
import { hash } from 'bcryptjs'
import { Plan, User } from '@prisma/client'

interface RegisterUseCaseInterface {
  name: string
  email: string
  password: string
  role: 'ADMIN' | 'MEMBER'
  plan: Plan
}

interface RegisterUseCaseResponse {
  user: User
}
export class RegisterUseCase {
  constructor(private repository: UsersRepository) {}

  async create({
    name,
    email,
    password,
    role,
    plan,
  }: RegisterUseCaseInterface): Promise<RegisterUseCaseResponse> {
    const userWithSameEmail = await this.repository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserDuplicatedException()
    }

    const password_hash = await hash(password, 6)

    const user = await this.repository.create({
      name,
      email,
      password_hash,
      role,
      plan,
    })

    return {
      user,
    }
  }
}
