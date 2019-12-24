const faker = require("faker")
const User = require("../../models/User")
const userController = require("./index")

jest.mock("../../models/User")

describe("UserController", () => {
	describe("create", () => {
		it("should call User.create with a valid body", async () => {
			const requestMock = {
				body: {
					username: faker.internet.userName(),
					email: faker.internet.email(),
					password: faker.internet.password()
				}
			}

			const responseJsonMock = jest.fn()
			const responseMock = {
				status: jest.fn(() => ({ json: responseJsonMock }))
			}

			const createdUser = { _id: "adsfasd" }
			User.create.mockResolvedValue(createdUser)

			await userController.create(requestMock, responseMock)

			expect(responseMock.status.mock.calls.length).toBe(1)
			expect(responseMock.status.mock.calls[0][0]).toBe(201) // response with right status
			expect(responseJsonMock.mock.calls.length).toBe(1)
			expect(responseJsonMock.mock.calls[0][0]).toHaveProperty("id") // response with right status
			expect(User.create.mock.calls.length).toBe(1)
			expect(User.create.mock.calls[0][0]).toBe(requestMock.body)
		})

		it("should not call User.create with a empty body", async () => {
			const requestMock = {
				body: {}
			}

			const responseJsonMock = jest.fn()
			const responseMock = {
				status() {
					return { json: responseJsonMock }
				}
			}

			const createdUser = { _id: faker.random.uuid() }
			User.create.mockResolvedValue(createdUser)

			await userController.create(requestMock, responseMock)

			expect(responseJsonMock.mock.calls.length).toBe(1)
			expect(responseJsonMock.mock.calls[0][0]).toHaveProperty("errorMessage")
			expect(User.create.mock.calls.length).toBe(0)
		})
	})
})
