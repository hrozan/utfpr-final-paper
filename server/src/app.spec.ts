import { run } from "./app"

describe("App", () => {
  it("should run and shutdown app successfully", async () => {
    const port: number = 3001

    const app = await run(port)
    await app.shutdown()

    expect(app).toBeDefined()
  })
})
