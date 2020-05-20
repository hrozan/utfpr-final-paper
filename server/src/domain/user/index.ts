import { Context } from "koa"
import Router from "koa-router"
import * as model from "./model"
import * as services from "./service"

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

router.post("/login", async (ctx: Context) => {
  const credential = ctx.request.body
  const token = await services.login(credential)

  if (!token) {
    ctx.status = 400
    ctx.body = {}
    return
  }

  ctx.body = { token }
})
export default router
