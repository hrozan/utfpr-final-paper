import Router from "koa-router"
import { AuthController } from "./auth.controller"

export const controller = new AuthController()
export const authRoutes = new Router({ prefix: "/auth" })

authRoutes.post("/login", controller.login)
