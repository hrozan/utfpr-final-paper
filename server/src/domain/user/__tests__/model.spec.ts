import { createUser, User } from "../model"
import database from "../../../infra/database"
import * as faker from "faker"

beforeAll(async () => {
  await database.connect()
})

afterAll(async () => {
  await database.disconnect()
})

const createFakeUser = (): User => {
  const userName = faker.internet.userName()
  return { email: faker.internet.email(userName), password: faker.internet.password(), userName: userName }
}

describe("User", () => {
  it("should create a User successfully", async () => {
    const newUser = createFakeUser()

    const user = await createUser(newUser)

    expect(user._id).toBeDefined()
  })

  it("should fetch User successfully", async () => {
    const count = 3
    const newUsers = [...new Array(count)].map<User>(() => createFakeUser())

    const promises: Promise<User>[] = newUsers.map((user) => createUser(user))
    const users: User[] = await Promise.all(promises)

    expect(users.length).toBe(count)
    users.map((user) => expect(user._id).toBeDefined())
    users.map((user, i) => expect(user.email).toBe(newUsers[i].email))
    users.map((user, i) => expect(user.userName).toBe(newUsers[i].userName))
  })
})
