import { Context } from "koa"
import Router from "koa-router"
import { findAllUser, saveUser } from "./model"

const router = new Router({ prefix: "/users" })

// List all Users
router.get("/", async (ctx: Context) => (ctx.body = await findAllUser()))

// Create new User
router.post("/", async (ctx: Context) => {
  const result = await saveUser(ctx.request.body)
  ctx.status = 201
  return (ctx.body = { id: result._id })
})

export default router
