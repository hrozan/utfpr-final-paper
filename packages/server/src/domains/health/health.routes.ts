import Router from "koa-router"
import { Context } from "koa"

export const healthRouter = new Router()

healthRouter.get("/", (ctx: Context) => {
	ctx.body = { api: "up and running" }
})
