import Koa, { Context } from "koa"
import Router from "koa-router"
import user from "../domain/user"

const base = new Router()
base.get("/", (ctx: Context) => (ctx.body = { status: "ok", database: ctx.database.isConnected() }))

export default (app: Koa) => {
  app.use(base.routes()).use(base.allowedMethods())
  app.use(user.routes()).use(user.allowedMethods())
}
