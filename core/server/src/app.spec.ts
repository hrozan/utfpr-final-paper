import { start } from "./app"

describe("App", () => {
  it("should run and shutdown domain successfully", async () => {
    const port: number = 3001

    const app = await start(port)
    await app.shutdown()

    expect(app).toBeDefined()
  })
})
