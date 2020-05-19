import * as model from "../model"
import { User } from "../model"
import database from "../../../infra/database"
import * as faker from "faker"

beforeAll(async () => {
  await database.connect()
})

afterAll(async () => {
  await database.disconnect()
})

afterEach(async () => {
  await model.UserModel.deleteMany({})
})

const createFakeUser = (): User => {
  const userName = faker.internet.userName()
  return { email: faker.internet.email(userName), password: faker.internet.password(), userName: userName }
}

const createFakeUserAndSave = async (): Promise<User> => {
  const newUser = createFakeUser()
  return model.createUser(newUser)
}

describe("User", () => {
  it("should create a User", async () => {
    const newUser = createFakeUser()
    const user = await model.createUser(newUser)

    expect(user._id).toBeDefined()
  })

  it("should create a User and hash password", async () => {
    const newUser = createFakeUser()
    const user = await model.createUser(newUser)

    expect(user.password).not.toBe(newUser.password)
  })

  it("should read all Users", async () => {
    const count = 3
    const newUsers = [...new Array(count)].map<Promise<User>>(() => createFakeUserAndSave())
    await Promise.all(newUsers)

    const users = await model.readAllUser()

    expect(users.length).toBe(count)
    users.map((user) => expect(user._id).toBeDefined())
  })

  it("should fetch User by email", async () => {
    const { email } = await createFakeUserAndSave()

    const user = await model.findUserByEmail(email)

    expect(user?.email).toBe(email)
  })

  it("should check a user for login", async () => {
    const newUser = createFakeUser()
    await model.createUser(newUser)

    const result = await model.checkUserForLogin(newUser.email, newUser.password)

    expect(result).toBeTruthy()
  })
})
