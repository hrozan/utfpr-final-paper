import * as service from "../service"
import * as fake from "./fake"
import * as model from "../model"
import { AuthCredential } from "../types"
import database from "../../../infra/database"

describe("User.Service", () => {
  beforeAll(async () => {
    await database.connect()
  })

  afterAll(async () => {
    await database.disconnect()
  })

  beforeEach(async () => {
    await model.UserModel.deleteMany({})
  })

  it("should login user and return a token", async () => {
    const newUser = await fake.createFakeUser()
    await model.createUser(newUser)
    const credential: AuthCredential = {
      password: newUser.password,
      email: newUser.email
    }

    const token = await service.login(credential)

    expect(token).toBeTruthy()
  })
})
