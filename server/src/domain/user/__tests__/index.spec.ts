import request = require("supertest")
import * as fake from "./fake"
import * as model from "../model"
import { run } from "../../../app"
import { Server } from "http"
import { User } from "../model"

describe("User.Routes", () => {
  let server: Server
  let shutdown: Function
  beforeAll(async () => {
    const app = await run(3010)
    server = app.server
    shutdown = app.shutdown
  })

  afterAll(async () => {
    await shutdown()
  })

  beforeEach(async () => {
    await model.UserModel.deleteMany({})
  })

  it("GET  /users", async () => {
    const count = 3
    const newUsers = [...new Array(count)].map<Promise<User>>(() => fake.createFakeUserAndSave())
    await Promise.all(newUsers)

    const response = await request(server).get("/users")

    expect(response.status).toBe(200)
    expect(response.body.length).toBeGreaterThanOrEqual(count)
  })

  it("POST /users", async () => {
    const payload = fake.createFakeUser()

    const response = await request(server)
      .post("/users")
      .send(payload)

    expect(response.status).toBe(201)
  })

  it("DELETE /users/:id", async () => {
    const newUser = await fake.createFakeUserAndSave()

    const response = await request(server).del(`/users/${newUser._id}`)

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty("id")
  })
})
