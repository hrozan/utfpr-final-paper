import * as faker from "faker"
import * as model from "../model"
type User = model.User

export const createFakeUser = (): User => {
  const userName = faker.internet.userName()
  return {
    email: faker.internet.email(userName),
    password: faker.internet.password(),
    userName: userName,
  }
}

export const createFakeUserAndSave = async (): Promise<User> => {
  const newUser = createFakeUser()
  return model.createUser(newUser)
}
