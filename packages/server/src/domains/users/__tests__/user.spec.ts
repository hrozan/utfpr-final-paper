import { agent as request } from "supertest"
import { Application } from "../../../app"
import { StatusCodes } from "http-status-codes"
import { Server } from "http"
import { Env } from "../../../config"
import { UsersDto } from "../users.dto"

describe("User", () => {
	let app: Application
	let server: Server

	beforeAll(async () => {
		app = new Application().build(Env.test)
		server = await app.run(3002)
	})

	afterAll(async () => {
		await app.shutdown()
	})

	it("GET /users", async () => {
		const response = await request(server).get("/users")

		expect(response.status).toBe(StatusCodes.OK)
	})

	it("POST /users", async () => {
		const payload: UsersDto = { email: "higor@email.com", password: "asdfa", userName: "asdfa" }

		const response = await request(server).post("/users").send(payload)

		expect(response.status).toBe(StatusCodes.CREATED)
		console.log(response.body)
	})
})
