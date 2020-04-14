import { User } from "../model"
import * as user from "../repository"
import { close } from "../../../infra/database"

describe("create", () => {
  afterEach(async () => {
    await close()
  })
  it("should create a user", async () => {
    const newUser: User = { email: "teste@email.com", password: "pass123", userName: "Teste" }

    const result = await user.insertUser(newUser)

    expect(result._id).toBeDefined()
    expect(result.email).toBe(newUser.email)
    expect(result.password).toBe(newUser.password)
    expect(result.userName).toBe(newUser.userName)
  })
})
