import { connect, getDb, close, getCollection } from "../database"

afterEach(async () => {
  await close()
})

describe("connect", () => {
  it("should connect to database successfully", async () => {
    const database = await connect()

    expect(database.isConnected()).toBeTruthy()
  })
})

describe("getDb", () => {
  it("should connect to database successfully", async () => {
    const database = await getDb()

    expect(database).toBeDefined()
  })
})

describe("getCollection", () => {
  it("should return a collection", async () => {
    const collection = await getCollection("Test")

    expect(collection).toBeDefined()
  })
})
