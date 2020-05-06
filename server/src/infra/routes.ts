import Koa, { Context } from "koa"
import Router from "koa-router"
import user from "../domain/user"
import Database from "./database"

const base = new Router()

base.get("/", async (ctx: Context) => {
  const db = await Database.connect()
  ctx.body = { status: "ok", database: db.client.isConnected() }
})

export default (app: Koa) => {
  app.use(base.routes()).use(base.allowedMethods())
  app.use(user.routes()).use(user.allowedMethods())
}
