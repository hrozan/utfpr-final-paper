import faker from "faker"
import request from "supertest"
import app from "../../../src/app"
import { adminUser } from "../auth"

describe("Auth Resource", () => {
  describe("POST /login", () => {
    it("should login a user", async () => {
      const payload = {
        username: adminUser.username,
        password: adminUser.password
      }

      const response = await request(app)
        .post("/auth/login")
        .send(payload)
        .expect(200)

      expect(response.body).toHaveProperty("token")
      expect(response.body).toHaveProperty("id")
      expect(response.body.username).toBe(payload.username)
    })

    it("should not login a user with wrong password", async () => {
      const payload = {
        username: adminUser.username,
        password: faker.internet.password()
      }

      const response = await request(app)
        .post("/auth/login")
        .send(payload)
        .expect(400)

      console.log(response.body)
      expect(response.body).toHaveProperty("message")
    })
  })
})
