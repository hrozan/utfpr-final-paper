import { Context } from "koa"
import Router from "koa-router"
import * as model from "../user/model"
import * as jwt from "jsonwebtoken"
import { JWT_KEY } from "../../config"

export interface AuthCredential {
  email: string
  password: string
}

export interface TokenPayload {
  _id: string
}

const router = new Router({ prefix: "/auth" })

router.post("/login", async (ctx: Context) => {
  const credential: AuthCredential = ctx.request.body
  
  const user = await model.findUserByEmail(credential.email)
  if (!user) {
    return (ctx.status = 401)
  }

  const match = await model.checkUserPassword(credential.password, user.password)
  if (!match) {
    return (ctx.status = 401)
  }

  const payload: TokenPayload = { _id: user._id }
  const token = jwt.sign(payload, JWT_KEY)
  return (ctx.body = { token })
})

router.get("/", (ctx) => (ctx.body = { api: 1 }))

export default router
