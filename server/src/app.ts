import Koa from "koa"
import routes from "./infra/routes"
import middleware from "./infra/middleware"
import Database from "./infra/database"
import { App } from "./types"

declare interface ExtendableContext {
  database: Database
}

export const run = async (port: number): Promise<App> => {
  const app = new Koa()
  middleware(app)
  routes(app)

  // Inject database reference in express application
  const database = await Database.connect()
  app.context.database = database

  const server = app.listen(port)

  const shutdown = async () => {
    await database.close()
    server.close()
  }

  return {
    server,
    shutdown
  }
}
