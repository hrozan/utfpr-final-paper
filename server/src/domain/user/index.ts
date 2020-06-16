import { Context } from "koa"
import Router from "koa-router"
import * as model from "./model"

const router = new Router({ prefix: "/users" })

router.get("/", async (ctx: Context) => {
  ctx.body = await model.readAllUser()
})

router.post("/", async (ctx: Context) => {
  const newUser = ctx.request.body
  const result = await model.createUser(newUser)

  ctx.status = 201
  ctx.body = { id: result._id }
})

router.del("/:id", async (ctx: Context) => {
  const userId = ctx.params.id

  const deletedUser = await model.deleteUser(userId)

  if (!deletedUser) {
    ctx.status = 404
    ctx.body = {}
    return
  }

  ctx.body = { id: deletedUser._id }
})

export default router
