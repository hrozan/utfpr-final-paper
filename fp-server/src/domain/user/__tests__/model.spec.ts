import { validateUser, User } from "../model"

describe("validate", () => {
  it("should return undefined for a valid user", async () => {
    const user: User = { email: "test@email.com", password: "fasdfa", userName: "asdfasdf" }

    const result = validateUser(user)

    expect(result).toBeUndefined()
  })

  it("should return false for black values", async () => {
    const user: User = { email: "", password: "", userName: "" }

    const result = validateUser(user)

    expect(result.userName).toBeDefined()
    expect(result.password).toBeDefined()
    expect(result.email).toBeDefined()
  })

  it("should return true for a empty object", async () => {
    const user = {}

    const result = validateUser(user as User)

    expect(result).toBeDefined()
  })
})
