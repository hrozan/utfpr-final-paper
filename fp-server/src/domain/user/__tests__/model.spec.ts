import { IUser } from "../types"
import * as user from "../model"
import { close } from "../../../infra/database"

afterEach(async () => {
  await close()
})

describe("create", () => {
  it("should create a user", async () => {
    const newUser: IUser = { email: "teste@email.com", password: "pass123", userName: "Teste" }

    const result = await user.create(newUser)

    expect(result._id).toBeDefined()
    expect(result.email).toBe(newUser.email)
    expect(result.password).toBe(newUser.password)
    expect(result.userName).toBe(newUser.userName)
  })
})
