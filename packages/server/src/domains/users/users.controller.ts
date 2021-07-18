import { Context } from "koa"
import { plainToClass } from "class-transformer"
import { UsersDto } from "./users.dto"
import { validate } from "class-validator"
import { StatusCodes } from "http-status-codes"
import { getRepository } from "typeorm"
import { User } from "./user.entity"
import { UsersMapper } from "./users.mapper"
import { hash } from "bcrypt"

export class UsersController {
	async readAll(ctx: Context): Promise<void> {
		const repository = await getRepository(User)
		const users = await repository.find()
		ctx.body = { users }
	}

	async create(ctx: Context): Promise<void> {
		const payload = ctx.request.body
		const dto = plainToClass(UsersDto, payload)
		const errors = await validate(dto)

		if (errors.length !== 0) {
			ctx.status = StatusCodes.BAD_REQUEST
			ctx.body = {
				errors,
			}
		}

		const user = UsersMapper.toEntity(dto)
		user.password = await hash(user.password, 10)

		const repository = await getRepository(User)
		await repository.save(user)

		ctx.status = StatusCodes.CREATED
		ctx.body = { id: user.id }
		return
	}
}
