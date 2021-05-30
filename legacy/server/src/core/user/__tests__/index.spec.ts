import request = require("supertest")
import * as fake from "./user.mock"
import * as model from "../repository"
import { start } from "../../../app"
import { Server } from "http"
import { User } from "../repository"

describe("User.Routes", () => {
    let server: Server
    let shutdown: () => void
    beforeAll(async () => {
        const app = await start(3010)
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
        const newUsers = [...new Array(count)].map<Promise<User>>(() => fake.createUserMockAndSave())
        await Promise.all(newUsers)

        const token = await fake.login(server)
        const response = await request(server)
            .get("/users")
            .set({ token })

        expect(response.status).toBe(200)
        expect(response.body.length).toBeGreaterThanOrEqual(count)
    })

    it("POST /users", async () => {
        const payload = fake.createUserMock()

        const token = await fake.login(server)
        const response = await request(server)
            .post("/users")
            .set({ token })
            .send(payload)

        expect(response.status).toBe(201)
    })

    it("DELETE /users/:id", async () => {
        const newUser = await fake.createUserMockAndSave()

        const token = await fake.login(server)
        const response = await request(server)
            .del(`/users/${newUser._id}`)
            .set({ token })

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty("id")
    })
})
