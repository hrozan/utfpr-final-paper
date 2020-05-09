import { Context } from "koa"
import Router from "koa-router"
import { UserModel, User } from "./model"

const router = new Router({ prefix: "/users" })

// List all Users
router.get("/", async (ctx: Context) => (ctx.body = await UserModel.findAll()))

// Create new User
router.post("/", async (ctx: Context) => {
  const user = new User(ctx.request.body)
  try {
    const result = await UserModel.save(user)
    ctx.status = 201
    return (ctx.body = { id: result._id })
  } catch (e) {
    return (ctx.status = 400)
  }
})

export default router
