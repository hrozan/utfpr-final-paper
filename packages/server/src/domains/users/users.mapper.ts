import { UsersDto } from "./users.dto"
import { User } from "./user.entity"

export class UsersMapper {
	static toEntity(dto: UsersDto): User {
		const user = new User()
		user.userName = dto.userName
		user.email = dto.email
		user.password = dto.password

		return user
	}
}
