import database from "../database"

afterEach(async () => {
  await database.disconnect()
})

describe("Database", () => {
  it("should connect successfully from database", async () => {
    await database.connect()

    expect(database.isConnected()).toBeTruthy()
  })
})
