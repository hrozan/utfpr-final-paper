import { isEmpty } from "./index"

describe("Utils", () => {
  describe("isEmpty", () => {
    it("should return true when called with empty object", () => {
      expect(isEmpty({})).toBeTruthy()
    })
    it("should return false when called with a object with properties", () => {
      expect(isEmpty({ testProperty: "testValue" })).toBeFalsy()
    })
  })
})
