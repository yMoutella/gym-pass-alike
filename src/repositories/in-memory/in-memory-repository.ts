import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '../users-repository'

export default class InMemoryUserRepository implements UsersRepository {
  private items: User[] = []

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      const user = {
        name: data.name,
        id: 'mockId',
        email: data.email,
        password_hash: data.password_hash,
        created_at: new Date(),
      }
      this.items.push(user)
      resolve(user)
    })
  }

  async findById(id: string): Promise<User | null> {
    return new Promise<User | null>((resolve) => {
      const user = this.items.find((user) => user.id === id)
      if (!user) {
        resolve(null)
      }
      resolve(user!)
    })
  }
  async findByEmail(email: string): Promise<User | null> {
    return new Promise<User | null>((resolve) => {
      const user = this.items.find((user) => user.email === email)
      if (!user) {
        resolve(null)
      }
      resolve(user!)
    })
  }
}
