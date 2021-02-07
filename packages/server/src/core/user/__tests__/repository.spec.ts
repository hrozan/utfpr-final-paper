import { User } from "../repository"
import * as model from "../repository"
import * as fake from "./user.mock"
import { connect, disconnect, Db } from "../../../database"

describe("User.Model", () => {
  let db: Db | null = null

  beforeAll(async () => {
    db = await connect()
  })

  afterAll(async () => {
    if (db) await disconnect(db)
  })

  beforeAll(async () => {
    await model.UserModel.deleteMany({})
  })

  it("should create a User", async () => {
    const newUser = fake.createUserMock()
    const user = await model.createUser(newUser)

    expect(user._id).toBeDefined()
  })

  it("should create a User and hash password", async () => {
    const newUser = fake.createUserMock()
    const user = await model.createUser(newUser)

    expect(user.password).not.toBe(newUser.password)
  })

  it("should read all Users", async () => {
    const count = 3
    const newUsers = [...new Array(count)].map<Promise<User>>(() => fake.createUserMockAndSave())
    await Promise.all(newUsers)

    const users = await model.readAllUser()

    expect(users.length).toBeGreaterThanOrEqual(count)
    users.map((user) => expect(user._id).toBeDefined())
  })

  it("should fetch User by email", async () => {
    const { email } = await fake.createUserMockAndSave()

    const user = await model.findUserByEmail(email)

    expect(user?.email).toBe(email)
  })

  it("should check a user for password", async () => {
    const newUser = fake.createUserMock()
    const user = await model.createUser(newUser)

    const match = await model.checkUserPassword(newUser.password, user.password)

    expect(match).toBeTruthy()
  })

  it("should delete a user", async () => {
    const newUser = await fake.createUserMockAndSave()

    const user = await model.deleteUser(newUser._id)

    expect(user?._id).toEqual(newUser._id)
  })
})
