import { UsersDto } from "../users.dto"
import { UsersMapper } from "../users.mapper"
import { User } from "../user.entity"

describe("UserMapper", () => {
	it("should map a dto to a user", () => {
		const dto: UsersDto = { email: "hrozan@email.com", password: "test123", userName: "hrozan" }

		const user = UsersMapper.toEntity(dto)

		expect(user).toBeInstanceOf(User)
		expect(user.email).toEqual(dto.email)
	})
})
