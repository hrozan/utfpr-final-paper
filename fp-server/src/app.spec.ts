import { run, shutDown } from "./app"
import { App } from "./infra/types"

describe("run", () => {
  let app: App

  afterEach(async () => {
    if (!app) return
    await shutDown(app)()
  })

  it("should run app successfully", async () => {
    app = await run(3001)

    expect(app.server).toBeDefined()
    expect(app.database).toBeDefined()
  })
})
