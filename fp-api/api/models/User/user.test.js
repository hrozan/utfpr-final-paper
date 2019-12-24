require("dotenv").config()
// Remove Log on Testing
process.env.DEBUG = undefined
const User = require("./index")
const database = require("../../../database")
const mongoose = require("mongoose")
const faker = require("faker")

beforeAll(async function() {
	await database.init()
})
afterAll(async function() {
	await User.deleteMany({})
	await mongoose.disconnect()
})

describe("UserModel", () => {
	describe("create", () => {
		it("should create successfully", async () => {
			const userMock = {
				username: faker.internet.userName(),
				email: faker.internet.email(),
				password: faker.internet.password()
			}

			const user = await User.create(userMock)

			expect(user).toHaveProperty("_id")
		})

		it("should not create a duplicate user ", async () => {
			const userMock = {
				username: faker.internet.userName(),
				email: faker.internet.email(),
				password: faker.internet.password()
			}

			await User.create(userMock)
			expect(User.create.bind(userMock)).toThrow()
		})

		it("should not create with empty object ", async () => {
			expect(User.create.bind({})).toThrow()
		})

		it("should create ignoring extra property", async () => {
			const userMock = {
				username: faker.internet.userName(),
				email: faker.internet.email(),
				password: faker.internet.password(),
				extraProperty: "DangerValue"
			}

			const user = await User.create(userMock)

			expect(user).not.toHaveProperty("extraProperty")
		})

		it("should not create with missing email", async () => {
			const userMock = {
				username: faker.internet.userName(),
				password: faker.internet.password()
			}
			expect(User.create.bind(userMock)).toThrow()
		})

		it("should not create with missing password", async () => {
			const userMock = {
				username: faker.internet.userName(),
				email: faker.internet.email()
			}
			expect(User.create.bind(userMock)).toThrow()
		})

		it("should not create with missing password ", async () => {
			const userMock = {
				email: faker.internet.email(),
				password: faker.internet.password()
			}

			expect(User.create.bind(userMock)).toThrow()
		})
	})
})
