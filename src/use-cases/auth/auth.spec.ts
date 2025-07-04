import InMemoryUserRepository from '@/repositories/in-memory/in-memory-repository'
import { describe, it } from 'vitest'
import { RegisterUseCase } from '../register/register'
import { AuthUseCase } from './auth'

describe('User should authenticate', () => {
  it('User should be able to authenticate', async () => {
    const userRepository = new InMemoryUserRepository()
    const userRegisterUseCase = new RegisterUseCase(userRepository)

    const user = {
      name: 'John doe',
      email: 'johndoe@johnland.com',
      password: 'passwordTest',
    }
    await userRegisterUseCase.create(user)

    const authUseCase = new AuthUseCase(userRepository)
    // authUseCase.execute(user.email, user.password)
  })
})
