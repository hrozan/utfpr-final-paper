import { Context, Next } from "koa"
import * as jwt from "jsonwebtoken"
import { JWT_KEY } from "../../config"
import { TokenPayload } from "./index"

export default async (ctx: Context, next: Next) => {
  const { token } = ctx.request.headers
  if (!token) {
    return (ctx.status = 401)
  }

  try {
    const payload = jwt.verify(token, JWT_KEY) as TokenPayload
    ctx.userId = payload._id
  } catch (e) {
    console.error("Token Verification Error")
    return (ctx.status = 401)
  }

  await next()
}
