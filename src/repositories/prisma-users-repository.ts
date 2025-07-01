import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'

export default class PrismaUserRepository {
  constructor() {}
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }

  async find(data: Prisma.UserWhereUniqueInput) {
    const user = await prisma.user.findUnique({
      where: {
        ...data,
      },
    })
    return user
  }
}
