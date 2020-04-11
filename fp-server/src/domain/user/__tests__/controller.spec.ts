import * as controller from "../controller"
import * as faker from "faker"

jest.mock("../model")
import * as model from "../model"

const user = { _id: faker.random.uuid() }
// @ts-ignore
model.create.mockImplementation(() => user)

describe("createUser", () => {
  it("should call model create", async () => {
    const data = {
      userName: "test",
      password: "teasdhjgbajshd"
    }

    const id = await controller.createUser(data)

    expect(id).toBe(user._id)
    expect(model.create).toHaveBeenCalled()
  })
})
