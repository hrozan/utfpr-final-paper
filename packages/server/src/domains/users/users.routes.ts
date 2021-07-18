import Router from "koa-router"
import { UsersController } from "./users.controller"

export const usersController = new UsersController()
export const userRoutes = new Router({ prefix: "/users" })

userRoutes.get("/", usersController.readAll)
userRoutes.post("/", usersController.create)
