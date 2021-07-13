import { Context } from "koa"
import Router from "koa-router"
import { StatusCodes } from "http-status-codes"
import { plainToClass } from "class-transformer"
import { UsersDto } from "./users.dto"
import { validate } from "class-validator"
import { UsersMapper } from "./users.mapper"

export const userRoutes = new Router({ prefix: "/users" })

userRoutes.get("/", async (ctx: Context) => {
	ctx.body = {
		users: "hello",
	}
})

userRoutes.post("/", async (ctx: Context) => {
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

	ctx.status = StatusCodes.CREATED
	return (ctx.body = { id: 1 })
})
//
// router.del("/:id", async (ctx: Context) => {})
