import request = require("supertest")
import { login } from "../../user/__tests__/fake"
import { Server } from "http"
import { start } from "../../../app"

describe("Broker.Routes", () => {
  let server: Server
  let shutdown: Function
  beforeAll(async () => {
    const app = await start(3013)
    server = app.server
    shutdown = app.shutdown
  })

  afterAll(async () => {
    await shutdown()
  })

  it("GET  /broker", async () => {
    const token = await login(server)
    const response = await request(server)
      .get("/broker")
      .set({ token })

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty("user")
    expect(response.body).toHaveProperty("password")
  })
})
