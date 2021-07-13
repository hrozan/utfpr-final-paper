import Koa, { Context } from "koa"
import Router from "koa-router"
import auth from "./domains/auth"
import authMiddleware from "./domains/auth/middleware"
import { userRoutes } from "./domains/users"
import broker from "./domains/broker"
import Debug from "debug"

const debug = Debug("app:routes")

// Health Check
const rootRouter = new Router()
rootRouter.get("/", (ctx: Context) => {
	ctx.body = { api: "up and running" }
})

export function loadRoutes(app: Koa): Koa {
	// Public Routes
	debug("/")
	app.use(rootRouter.routes()).use(rootRouter.allowedMethods())
	// app.use(auth.routes()).use(auth.allowedMethods())
	//
	// app.use(authMiddleware)
	// Private Routes
	debug("/users")
	app.use(userRoutes.routes()).use(userRoutes.allowedMethods())
	// app.use(broker.routes()).use(broker.allowedMethods())
	return app
}
