import {disconnectDb, connectDb} from "../database"

describe("Database", () => {

  it("should connect successfully from database", async () => {
    const db = await connectDb()

    expect(db.isConnected).toBeTruthy()

    await disconnectDb(db)
  })
})
