import PrismaUserRepository from '@/repositories/prisma/prisma-users-repository'
import { AuthUseCase } from '../auth/auth'

export default function makeAuthUseCase() {
  const userRepo = new PrismaUserRepository()
  const auth = new AuthUseCase(userRepo)
  return auth
}
