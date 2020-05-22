import Koa, { Context } from "koa"
import Router from "koa-router"
import user from "../domain/user"
import database from "./database"

const base = new Router()

base.get("/", async (ctx: Context) => {
  ctx.body = { status: "ok", database: database.isConnected() }
})

export default (app: Koa) => {
  app.use(base.routes()).use(base.allowedMethods())
  app.use(user.routes()).use(user.allowedMethods())
}
