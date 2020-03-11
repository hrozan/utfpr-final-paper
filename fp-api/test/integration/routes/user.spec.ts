import faker from "faker"
import request from "supertest"
import app from "../../../src/app"
import auth from "../auth"

type MockUser = {
  username: string
  email: string
  password: string
}

describe("User Routes", () => {
  describe("POST /user", () => {
    it("should create a user", async () => {
      const payload = {
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password()
      }

      const response = await request(app)
        .post("/user")
        .use(auth)
        .send(payload)
        .expect(201)

      expect(response.body).toHaveProperty("id")
    })

    it("should not create user with empty payload", async () => {
      const response = await request(app)
        .post("/user")
        .use(auth)
        .send({})
        .expect(400)

      expect(response.body).toHaveProperty("errorMessage")
    })

    it("should not create user with same email", async () => {
      const payload = {
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password()
      }

      await request(app)
        .post("/user")
        .use(auth)
        .send(payload)
        .expect(201)

      await request(app)
        .post("/user")
        .use(auth)
        .send(payload)
        .expect(400)
    })
  })

  describe("GET /user", () => {
    it("should list 3 user", async () => {
      const payload: Array<MockUser> = []

      const payloadLength = 3

      for (let i = 0; i < payloadLength; i++) {
        payload.push({
          username: faker.internet.userName(),
          email: faker.internet.email(),
          password: faker.internet.password()
        })
      }

      for (let i = 0; i < payloadLength; i++) {
        await request(app)
          .post("/user")
          .use(auth)
          .send(payload[i])
          .expect(201)
      }

      const response = await request(app)
        .get("/user")
        .use(auth)

      let found = 0
      const users = response.body
      users.forEach((createdUsers: MockUser) => {
        payload.forEach(expectedUser => {
          if (createdUsers.username === expectedUser.username) {
            found++
          }
        })
      })
      expect(found).toBe(3)
    })
  })

  describe("GET /user:id", () => {
    it("should return user data", async () => {
      const payload = {
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password()
      }

      const { body } = await request(app)
        .post("/user")
        .use(auth)
        .send(payload)
        .expect(201)

      const response = await request(app)
        .get(`/user/${body.id}`)
        .use(auth)
        .expect(200)

      const { user } = response.body

      expect(user.username).toBe(payload.username)
      expect(user.email).toBe(payload.email)
      expect(user.password).toBeUndefined()
    })
  })

  describe("DELETE /user/:id", () => {
    it("should delete a user", async () => {
      const payload = {
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password()
      }

      const { body } = await request(app)
        .post("/user")
        .use(auth)
        .send(payload)
        .expect(201)

      const response = await request(app)
        .delete(`/user/${body.id}`)
        .use(auth)
        .expect(200)

      expect(response.body).toHaveProperty("message")
    })

    it("should not delete a user with invalid id", async () => {
      const response = await request(app)
        .delete(`/user/dfasdfasdfasd`)
        .use(auth)
        .expect(400)

      expect(response.body).toHaveProperty("errorMessage")
    })
  })
})
