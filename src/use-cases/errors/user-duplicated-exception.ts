export class UserDuplicatedException extends Error {
  constructor() {
    super('Email already exists!😥')
  }
}
