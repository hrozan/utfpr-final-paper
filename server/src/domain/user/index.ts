import { Context } from "koa"
import Router from "koa-router"
import * as model from "./model"

const router = new Router({ prefix: "/users" })

// List all Users
router.get("/", async (ctx: Context) => {
  ctx.body = await model.readAllUser()
})

// Create new User
router.post("/", async (ctx: Context) => {
  const newUser = ctx.request.body
  const result = await model.createUser(newUser)

  ctx.status = 201
  ctx.body = { id: result._id }
})

export default router
