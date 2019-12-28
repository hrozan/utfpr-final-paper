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

describe("Smart Resource", () => {
	describe("GET /mqtt/credentials", () => {
		it("should return broker credentials", async () => {
			const response = await request(app)
				.get("/mqtt/credentials")
				.set({ Authorization: token })
				.expect(200)

			expect(response.body).toHaveProperty("userName")
			expect(response.body).toHaveProperty("password")
		})
	})
})
