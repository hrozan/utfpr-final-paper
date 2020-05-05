import { Context } from "koa"
import Router from "koa-router"
import { UserModel } from "./model"

const router = new Router({ prefix: "/users" })

// List all Users
router.get("/", async (ctx: Context) => {
  const user = new UserModel(ctx.database)
  try {
    return (ctx.body = await user.findAll())
  } catch (e) {
    ctx.status = 500
    ctx.body = {}
  }
})

// Create new User
router.post("/", async (ctx: Context) => {
  const user = new UserModel(ctx.database, ctx.request.body)

  try {
    const result = await user.save()
    ctx.status = 201
    return (ctx.body = { id: result._id })
  } catch (e) {
    ctx.status = 500
    ctx.body = {}
  }
})

export default router
