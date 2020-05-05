import Database from "../database"

const testCollection = "TestCollection"
interface TestDocument {
  _id?: string
  content: string
}

describe("connect", () => {
  let database: Database

  beforeAll(async () => {
    database = await Database.connect()
  })

  afterAll(async () => {
    if (database) {
      await database.close()
    }
  })

  it("should connect to database successfully", async () => {
    expect(database.client.isConnected()).toBeTruthy()
  })

  it("should insert to database", async () => {
    const newTestDocument: TestDocument = {
      content: "Lorem ipsum dolor"
    }

    const testDocument = await database.insert(testCollection)<TestDocument>(newTestDocument)

    expect(testDocument._id).toBeDefined()
  })
})
