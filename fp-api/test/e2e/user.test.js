require("dotenv").config({ path: ".env.test" })
const database = require("../../database")
const faker = require("faker")
const request = require("supertest")
const app = require("../../api/app")
const User = require("../../api/models/User")

const adminUser = {
	username: faker.internet.userName(),
	email: faker.internet.email(),
	password: faker.internet.password()
}

let token

beforeAll(async function() {
	await database.init()
	// create test user
	await User.create(adminUser)

	const payload = {
		username: adminUser.username,
		password: adminUser.password
	}

	const response = await request(app)
		.post("/login")
		.send(payload)

	token = response.body.token
})
afterAll(async function() {
	await database.close()
})

describe("User Resource", () => {
	describe("POST /user", () => {
		it("should create a user", async () => {
			const payload = {
				username: faker.internet.userName(),
				email: faker.internet.email(),
				password: faker.internet.password()
			}

			const response = await request(app)
				.post("/user")
				.set({ Authorization: token })
				.send(payload)
				.expect(201)

			expect(response.body).toHaveProperty("id")
		})

		it("should not create user with empty payload", async () => {
			const response = await request(app)
				.post("/user")
				.set({ Authorization: token })
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
				.set({ Authorization: token })
				.send(payload)
				.expect(201)

			await request(app)
				.post("/user")
				.set({ Authorization: token })
				.send(payload)
				.expect(400)
		})
	})

	describe("GET /user", () => {
		it("should list 3 user", async () => {
			const payload = []
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
					.set({ Authorization: token })
					.send(payload[i])
					.expect(201)
			}

			const response = await request(app)
				.get("/user")
				.set({ Authorization: token })

			let found = 0
			const users = response.body
			users.forEach(createdUsers => {
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
				.set({ Authorization: token })
				.send(payload)
				.expect(201)

			const response = await request(app)
				.get(`/user/${body.id}`)
				.set({ Authorization: token })
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
				.set({ Authorization: token })
				.send(payload)
				.expect(201)

			const response = await request(app)
				.delete(`/user/${body.id}`)
				.set({ Authorization: token })
				.expect(200)

			expect(response.body).toHaveProperty("message")
		})

		it("should not delete a user with invalid id", async () => {
			const response = await request(app)
				.delete(`/user/dfasdfasdfasd`)
				.set({ Authorization: token })
				.expect(400)

			expect(response.body).toHaveProperty("errorMessage")
		})
	})
})
