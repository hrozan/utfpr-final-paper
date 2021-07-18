import { Context } from "koa"
import Router from "koa-router"
import { config } from "../../config"

const [user, password] = config.brokerCredential.split(".")

export const brokerRoutes = new Router({ prefix: "/broker" })

brokerRoutes.get("/", (ctx: Context) => {
	ctx.body = { user, password }
})
