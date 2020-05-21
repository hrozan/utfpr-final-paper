import database from "../database"

describe("Database", () => {
  afterEach(async () => {
    await database.disconnect()
  })

  it("should connect successfully from database", async () => {
    await database.connect()

    expect(database.isConnected()).toBeTruthy()
  })
})
