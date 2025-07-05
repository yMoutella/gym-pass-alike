import PrismaUserRepository from '@/repositories/prisma/prisma-users-repository'
import { RegisterUseCase } from '../register/register'

export default function makeRegisterUseCase() {
  const repo = new PrismaUserRepository()
  const regUseCase: RegisterUseCase = new RegisterUseCase(repo)
  return regUseCase
}
