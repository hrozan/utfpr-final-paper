import { IsString, IsNotEmpty, IsEmail } from "class-validator"

export class UsersDto {
	@IsNotEmpty()
	@IsString()
	userName: string

	@IsNotEmpty()
	@IsString()
	@IsEmail()
	email: string

	@IsNotEmpty()
	@IsString()
	password: string
}
