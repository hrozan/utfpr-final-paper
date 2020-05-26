import nock from "nock"
import service, { loginUrl } from "../service"
import { Credentials } from "../types"
import { API_URL } from "../../../infra/config"

describe("Auth.Service", () => {
  it("should login a user", async () => {
    const responseMock = { token: "test-token" }
    nock(API_URL)
      .post(loginUrl)
      .reply(200, responseMock)

    const payload: Credentials = {
      email: "test@email.com",
      password: "pass123",
    }
    const token = await service.login(payload)

    expect(token).toBeDefined()
  })
})
