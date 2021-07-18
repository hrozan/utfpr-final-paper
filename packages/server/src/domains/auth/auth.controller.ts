import { Context } from "koa"
import { getRepository } from "typeorm"
import { User } from "../users/user.entity"
import { compare } from "bcrypt"
import * as jwt from "jsonwebtoken"
import { config } from "../../config"

export interface AuthCredential {
	email: string
	password: string
}

export interface TokenPayload {
	_id: string
}

export class AuthController {
	async login(ctx: Context): Promise<void> {
		const credential: AuthCredential = ctx.request.body
		const userRepository = getRepository(User)

		const user = await userRepository.findOne({ where: { email: credential.email } })
		if (!user) {
			ctx.status = 401
			return
		}

		const match = await compare(credential.password, user.password)
		if (!match) {
			ctx.status = 401
			return
		}

		const payload: TokenPayload = { _id: user.id }
		const token = jwt.sign(payload, config.jwtKey)
		ctx.body = { token }
	}
}
