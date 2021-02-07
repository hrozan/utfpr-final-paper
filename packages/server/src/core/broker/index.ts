import { Context } from "koa"
import Router from "koa-router"
import { config } from "../../config"

const [user, password] = config.brokerCredential.split(".")

const router = new Router({ prefix: "/broker" })

router.get("/", (ctx: Context) => {
  ctx.body = { user, password }
})

export default router
