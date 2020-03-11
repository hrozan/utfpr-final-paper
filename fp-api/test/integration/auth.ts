import supertest from "supertest"
import { SuperAgentRequest } from "superagent"
import app from "../../src/app"
import faker from "faker"
import User from "../../src/domain/user/model"

export const adminUser = {
  username: faker.internet.userName(),
  email: faker.internet.email(),
  password: faker.internet.password()
}

let token: string
export async function createAdmin(): Promise<void> {
  await User.create(adminUser)
  const response = await supertest(app)
    .post("/auth/login")
    .send(adminUser)
  token = response.body.token
}

export default function auth(request: SuperAgentRequest): SuperAgentRequest {
  request.set({ Authorization: token })
  return request
}
