import { Context, Next } from "koa"
import * as jwt from "jsonwebtoken"
import { config } from "../../config"
import { TokenPayload } from "./auth.controller"

export async function authMiddleware(ctx: Context, next: Next): Promise<void> {
	const { authorization } = ctx.request.headers
	if (!authorization) {
		ctx.status = 401
		return
	}

	try {
		const payload = jwt.verify(authorization, config.jwtKey) as TokenPayload
		ctx.userId = payload._id
	} catch (e) {
		console.error("Token Verification Error")
		ctx.status = 401
		return
	}

	await next()
}
