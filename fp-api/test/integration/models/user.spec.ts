import User from "../../../src/domain/user/model"
import mongoose from "mongoose"
import faker from "faker"

describe("User Model", () => {
  describe("create", () => {
    it("should create successfully", async () => {
      const userMock = {
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password()
      }

      const user = await User.create(userMock)
      expect(user).toHaveProperty("_id")
    })

    it("should create user with hashed password", async () => {
      const userMock = {
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password()
      }

      const user = await User.create(userMock)

      // @ts-ignore
      expect(user.password).not.toBe(userMock.password)
    })

    it("should not create a duplicate user ", async () => {
      const userMock = {
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password()
      }

      await User.create(userMock)

      await expect(User.create(userMock)).rejects.toThrow(/duplicate key/)
    })

    it("should not create with empty object ", async () => {
      await expect(User.create({})).rejects.toThrow()
    })

    it("should create ignoring extra property", async () => {
      const userMock = {
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        extraProperty: "DangerValue"
      }

      const user = await User.create(userMock)

      expect(user).not.toHaveProperty("extraProperty")
    })

    it("should not create with missing email", async () => {
      const userMock = {
        username: faker.internet.userName(),
        password: faker.internet.password()
      }
      await expect(User.create(userMock)).rejects.toThrow()
    })

    it("should not create with missing password", async () => {
      const userMock = {
        username: faker.internet.userName(),
        email: faker.internet.email()
      }
      await expect(User.create(userMock)).rejects.toThrow()
    })

    it("should not create with missing password ", async () => {
      const userMock = {
        email: faker.internet.email(),
        password: faker.internet.password()
      }

      await expect(User.create(userMock)).rejects.toThrow()
    })
  })

  describe("list", () => {
    it("should list all user", async () => {})
  })

  describe("delete", () => {
    it("should delete a user", async () => {
      const userMock = {
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password()
      }
      const { _id } = await User.create(userMock)
      const result = await User.deleteOne({ _id })

      expect(result.n).toBe(1)
    })

    it("should not delete a user with invalid id", async () => {
      const result = await User.deleteOne({ _id: mongoose.Types.ObjectId() })
      expect(result.n).toBe(0)
    })
  })
})
