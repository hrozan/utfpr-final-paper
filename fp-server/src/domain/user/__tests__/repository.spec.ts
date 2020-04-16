import { User } from "../model"
import * as user from "../repository"
import { close, connect } from "../../../infra/database"

describe("create", () => {
  afterEach(async () => {
    await close()
  })

  beforeEach(async () => {
    await connect()
  })

  it("should create a user", async () => {
    const newUser: User = { email: "teste@email.com", password: "pass123", userName: "Teste" }

    const result = await user.insertUser(newUser)

    expect(result._id).toBeDefined()
    expect(result.email).toBe(newUser.email)
    expect(result.password).toBe(newUser.password)
    expect(result.userName).toBe(newUser.userName)
  })

  it("should create a user", async () => {
    const newUser: User = { email: "teste@email.com", password: "pass123", userName: "Teste" }
    const newUser2 = {...newUser}
    await user.insertUser(newUser)
    const result = await user.insertUser(newUser2)

    console.log(result)
  })
})
