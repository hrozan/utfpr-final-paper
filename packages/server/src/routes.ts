import Koa from "koa"
import { userRoutes } from "./domains/users"
import { authRoutes } from "./domains/auth"
import { healthRouter } from "./domains/health"
import { authMiddleware } from "./domains/auth/auth.middleware"
import { brokerRoutes } from "./domains/broker"

export function loadRoutes(app: Koa): Koa {
	app.use(healthRouter.routes()).use(healthRouter.allowedMethods())
	app.use(authRoutes.routes()).use(authRoutes.allowedMethods())

	app.use(authMiddleware)

	app.use(userRoutes.routes()).use(userRoutes.allowedMethods())
	app.use(brokerRoutes.routes()).use(brokerRoutes.allowedMethods())
	return app
}
