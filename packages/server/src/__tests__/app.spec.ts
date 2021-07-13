import { Application } from "../app"

describe("App", () => {
	let app: Application

	beforeEach(() => {
		app = new Application()
	})

	afterEach(async () => {
		await app.shutdown()
	})

	it("should run successfully", async () => {
		await app.build().run(3001)

		expect(app.server).toBeDefined()
	})
})
