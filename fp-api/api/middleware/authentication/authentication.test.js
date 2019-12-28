const authentication = require("./index")
const jwt = require("jsonwebtoken")

jest.mock("jsonwebtoken")

describe("Authentication Middleware", () => {
	it("should authenticate user with success", async () => {
		const reqMock = {
			headers: {
				authorization: "12341234123412341"
			}
		}
		const nextMock = jest.fn()

		jwt.verify.mockImplementation((token, JWT_KEY, cb) => {
			cb(null, {})
		})

		await authentication.middleware(reqMock, {}, nextMock)

		expect(nextMock).toBeCalledTimes(1)
		expect(reqMock).toHaveProperty("user")
	})

	it("should not authenticate user with no token", async () => {
		const reqMock = {
			headers: {}
		}
		const nextMock = jest.fn()
		const resMock = { status: jest.fn(() => ({ json: jest.fn })) }

		jwt.verify.mockImplementation((token, JWT_KEY, cb) => {
			cb(null, {})
		})

		await authentication.middleware(reqMock, resMock, nextMock)

		expect(resMock.status).toBeCalledTimes(1)
		expect(nextMock).toBeCalledTimes(0)
		expect(reqMock).not.toHaveProperty("user")
	})
})
