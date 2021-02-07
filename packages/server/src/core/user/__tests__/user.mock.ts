import * as faker from "faker"
import { createUser, User } from "../repository"
import { Server } from "http"
import request = require("supertest")

export const createUserMock = (): User => {
  const userName = faker.internet.userName()
  return {
    email: faker.internet.email(userName),
    password: faker.internet.password(),
    userName: userName,
  }
}

export const createUserMockAndSave = async (): Promise<User> => {
  const newUser = createUserMock()
  return createUser(newUser)
}

export const login = async (server: Server): Promise<string> => {
  const user = createUserMock()
  await createUser(user)
  const response = await request(server)
    .post("/auth/login")
    .send({ email: user.email, password: user.password })
  return response.body.token
}
