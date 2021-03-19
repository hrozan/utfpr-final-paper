import { disconnect, connect } from "../index"

describe("Database", () => {
    it("should connect successfully from database", async () => {
        const db = await connect()

        expect(db.isConnected).toBeTruthy()

        await disconnect(db)
    })
})
