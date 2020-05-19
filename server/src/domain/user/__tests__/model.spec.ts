import * as model from "../model"
import * as util from "./utils"
import { User } from "../types"
import database from "../../../infra/database"

beforeAll(async () => {
  await database.connect()
})

afterAll(async () => {
  await database.disconnect()
})

afterEach(async () => {
  await model.UserModel.deleteMany({})
})

describe("User.Model", () => {
  it("should create a User", async () => {
    const newUser = util.createFakeUser()
    const user = await model.createUser(newUser)

    expect(user._id).toBeDefined()
  })

  it("should create a User and hash password", async () => {
    const newUser = util.createFakeUser()
    const user = await model.createUser(newUser)

    expect(user.password).not.toBe(newUser.password)
  })

  it("should read all Users", async () => {
    const count = 3
    const newUsers = [...new Array(count)].map<Promise<User>>(() => util.createFakeUserAndSave())
    await Promise.all(newUsers)

    const users = await model.readAllUser()

    expect(users.length).toBe(count)
    users.map((user) => expect(user._id).toBeDefined())
  })

  it("should fetch User by email", async () => {
    const { email } = await util.createFakeUserAndSave()

    const user = await model.findUserByEmail(email)

    expect(user?.email).toBe(email)
  })

  it("should check a user for password", async () => {
    const newUser = util.createFakeUser()
    const user = await model.createUser(newUser)

    const match = await model.checkUserPassword(newUser.password, user.password)

    expect(match).toBeTruthy()
  })
})
