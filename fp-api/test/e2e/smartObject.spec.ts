import * as database from "../../src/infra/database"
import faker from "faker"
import request from "supertest"
import app from "../../src/app"
import User from "../../src/domain/user/model"
import { IUser } from "./user"

const adminUser: IUser = {
  username: faker.internet.userName(),
  email: faker.internet.email(),
  password: faker.internet.password()
}

let token: string

beforeAll(async function() {
  // create test user
  await User.create(adminUser)

  const payload = {
    username: adminUser.username,
    password: adminUser.password
  }

  const response = await request(app)
    .post("/auth/login")
    .send(payload)

  token = response.body.token
})

describe("Smart Resource", () => {
  describe("GET /mqtt/credentials", () => {
    it("should return broker credentials", async () => {
      const response = await request(app)
        .get("/mqtt/credentials")
        .set({ Authorization: token })
        .expect(200)

      expect(response.body).toHaveProperty("userName")
      expect(response.body).toHaveProperty("password")
    })
  })
})
