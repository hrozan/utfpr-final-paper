require("dotenv").config({ path: ".env.test" })
const database = require("../../src/infra/database")
const faker = require("faker")
const request = require("supertest")
const app = require("../../src/app")
const User = require("../../src/domain/user/model")

const userMock = {
  username: faker.internet.userName(),
  email: faker.internet.email(),
  password: faker.internet.password()
}

beforeAll(async function() {
  await database.init()
  // create test user
  await User.create(userMock)
})
afterAll(async function() {
  await database.close()
})

describe("Auth Resource", () => {
  describe("POST /login", () => {
    it("should login a user", async () => {
      const payload = {
        username: userMock.username,
        password: userMock.password
      }

      const response = await request(app)
        .post("/login")
        .send(payload)
        .expect(200)

      expect(response.body).toHaveProperty("token")
      expect(response.body).toHaveProperty("id")
      expect(response.body.username).toBe(payload.username)
    })

    it("should not login a user with wrong password", async () => {
      const payload = {
        username: userMock.username,
        password: faker.internet.password()
      }

      const response = await request(app)
        .post("/login")
        .send(payload)
        .expect(400)

      console.log(response.body)
      expect(response.body).toHaveProperty("message")
    })
  })
})
