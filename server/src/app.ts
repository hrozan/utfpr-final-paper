import Koa from "koa"
import database from "./infra/database"
import { App } from "./types"
import user from "./domain/user"
import { ENV } from "./infra/config"
import morgan from "koa-morgan"
import bodyParser from "koa-bodyparser"

export const run = async (port: number): Promise<App> => {
  const app = new Koa()

  // Middleware
  if (ENV !== "test") {
    app.use(morgan("combined"))
  }
  app.use(bodyParser())

  // Routes
  app.use(user.routes()).use(user.allowedMethods())

  await database.connect()
  const server = app.listen(port)

  const shutdown = async () => {
    await database.disconnect()
    server.close()
  }

  return {
    server,
    shutdown,
  }
}
