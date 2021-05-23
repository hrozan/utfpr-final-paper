import { start } from "./app"

describe("App", () => {
    it("should run and shutdown core successfully", async () => {
        const port = 3001

        const app = await start(port)

        expect(app).toBeDefined()
        await app.shutdown()
    })
})
