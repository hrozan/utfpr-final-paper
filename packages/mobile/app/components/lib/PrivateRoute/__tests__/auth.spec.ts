import { getToken } from "../auth"

describe("auth", () => {
	it("should return Error when there is no token", async () => {
		await expect(getToken()).rejects.toThrowError("Token not found")
	})
})
