import {Context} from "koa"
import Router from "koa-router"
import {checkUserPassword, findUserByEmail} from "../user/repository"
import * as jwt from "jsonwebtoken"
import {config} from "../../config"

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

    const user = await findUserByEmail(credential.email)
    if (!user) {
        return (ctx.status = 401)
    }

    const match = await checkUserPassword(credential.password, user.password)
    if (!match) {
        return (ctx.status = 401)
    }

    const payload: TokenPayload = { _id: user._id }
    const token = jwt.sign(payload, config.jwtKey)
    return (ctx.body = { token })
})

export default router
