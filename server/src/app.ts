import Koa from "koa"
import routes from "./infra/routes"
import middleware from "./infra/middleware"
import database from "./infra/database"
import { App } from "./types"

export const run = async (port: number): Promise<App> => {
  const app = new Koa()
  middleware(app)
  routes(app)

  await database.connect()
  const server = app.listen(port)

  const shutdown = async () => {
    await database.disconnect()
    server.close()
  }

  return {
    server,
    shutdown
  }
}
