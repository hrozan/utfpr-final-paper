import request from "supertest"
import { run, shutDown } from "../../../app"
import { User } from "../model"
import { App } from "../../../infra/types"

let app: App

beforeAll(async () => {
  app = await run(3010)
})

afterAll(async () => {
  await shutDown(app)()
})

describe("POST /api/v1/user", () => {
  it("should create a user", async () => {
    const newUser: User = {
      email: "test@email.com",
      password: "pass123",
      userName: "test"
    }

    const response = await request(app.server)
      .post("/api/v1/user")
      .send(newUser)

    expect(response.status).toBe(201)
  })

  it("should error for a empty object", async () => {
    const newUser = {}

    const response = await request(app.server)
      .post("/api/v1/user")
      .send(newUser)

    expect(response.status).toBe(400)
  })
})
