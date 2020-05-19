import * as faker from "faker"
import { User } from "../types"
import * as model from "../model"

export const createFakeUser = (): User => {
  const userName = faker.internet.userName()
  return { email: faker.internet.email(userName), password: faker.internet.password(), userName: userName }
}

export const createFakeUserAndSave = async (): Promise<User> => {
  const newUser = createFakeUser()
  return model.createUser(newUser)
}
