import express from "express"
import routes from "./infra/routes"
import middleware from "./infra/middleware"
import * as database from "./infra/database"
import { App } from "./infra/types"

export const startServer = (port: number) => {
  const app = express()
  middleware(app)
  routes(app)
  return app.listen(port)
}

export const startDatabase = () => {
  return database.connect()
}

export const run = async (port: number): Promise<App> => {
  const server = startServer(port)
  const database = await startDatabase()
  return {
    server,
    database
  }
}

export const shutDown = (app: App) => async () => {
  await app.database.close()
  await app.server.close()
}
