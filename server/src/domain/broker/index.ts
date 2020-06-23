import { Context } from "koa"
import Router from "koa-router"
import { BROKER_CREDENTIAL } from "../../config"

const [user, password] = BROKER_CREDENTIAL.split(".")

const router = new Router({ prefix: "/broker" })

router.get("/", (ctx: Context) => {
  ctx.body = { user, password }
})

export default router
