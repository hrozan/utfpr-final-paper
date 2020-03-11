import request from "supertest"
import app from "../../../src/app"
import { auth } from "../auth"

describe("Smart Resource", () => {
  describe("GET /mqtt/credentials", () => {
    it("should return broker credentials", async () => {
      const response = await request(app)
        .get("/mqtt/credentials")
        .use(auth)
        .expect(200)

      expect(response.body).toHaveProperty("userName")
      expect(response.body).toHaveProperty("password")
    })
  })
})
