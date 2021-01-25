import * as faker from "faker"
import * as model from "../model"
import { User } from "../model"
import { Server } from "http"
import request = require("supertest")

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

export const login = async (server: Server): Promise<string> => {
  const user = createFakeUser()
  await model.createUser(user)
  const response = await request(server)
    .post("/auth/login")
    .send({ email: user.email, password: user.password })
  return response.body.token
}
