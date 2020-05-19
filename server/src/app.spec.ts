import { run } from "./app"

describe("App", () => {
  it("should run and shutdown app successfully", async () => {
    await expect(async () => {
      const port: number = 3001

      const app = await run(port)

      await app.shutdown()
    }).not.toThrowError()
  })
})
