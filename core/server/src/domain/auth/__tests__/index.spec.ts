import request = require("supertest")
import * as fake from "../../user/__tests__/fake"
import * as model from "../../user/model"
import { start } from "../../../app"
import { Server } from "http"

describe("Auth.Routes", () => {
  let server: Server
  let shutdown: Function
  beforeAll(async () => {
    const app = await start(3011)
    server = app.server
    shutdown = app.shutdown
  })

  afterAll(async () => {
    await shutdown()
  })

  beforeEach(async () => {
    await model.UserModel.deleteMany({})
  })

  it("POST /auth/login", async () => {
    const newUser = fake.createFakeUser()
    await model.createUser(newUser)

    const response = await request(server)
      .post("/auth/login")
      .send({ email: newUser.email, password: newUser.password })

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty("token")
  })
})
