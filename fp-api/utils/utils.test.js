const utils = require("./index")

describe("Utils", () => {
	describe("isEmpty", () => {
		it("should return true when called with empty object", () => {
			expect(utils.isEmpty({})).toBeTruthy()
		})
		it("should return false when called with a object with properties", () => {
			expect(utils.isEmpty({ testProperty: "testValue" })).toBeFalsy()
		})
	})
})
