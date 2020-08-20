import nock from "nock"
import { login, loginUrl, Credentials } from "../service"
import { API_URL } from "../../../infra/config"

describe("Login.Service", () => {
  it("should Login a user", async () => {
    const responseMock = { token: "test-token" }
    nock(API_URL).post(loginUrl).reply(200, responseMock)

    const payload: Credentials = {
      email: "test@email.com",
      password: "pass123",
    }
    const token = await login(payload)

    expect(token).toBeDefined()
  })
})
