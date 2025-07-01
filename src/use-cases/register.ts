import { prisma } from '@/lib/prisma'
import PrismaUserRepository from '@/repositories/prisma-users-repository'
import { hash } from 'bcryptjs'

interface RegisterUseCaseInterface {
  name: string
  email: string
  password: string
}

export class RegisterUseCase {
  constructor(private repository: any) {}

  async create({ name, email, password }: RegisterUseCaseInterface) {
    const userWithSameEmail = await this.repository.find({ email })

    if (userWithSameEmail) {
      throw new Error('Email already exists!')
    }

    const password_hash = await hash(password, 6)

    return await this.repository.create({ name, email, password_hash })
  }
}
