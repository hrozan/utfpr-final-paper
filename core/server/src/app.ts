import Koa from "koa"
import { Server } from "http"
import { connectDb, disconnectDb } from "./infra/database"
import { config } from "./config"
import morgan from "koa-morgan"
import bodyParser from "koa-bodyparser"
import authMiddleware from "./app/auth/middleware"
import user from "./app/user"
import auth from "./app/auth"
import broker from "./app/broker"

export type App = {
  server: Server
  shutdown: () => Promise<void>
}

export const start = async (port: number): Promise<App> => {
  const app = new Koa()

  // Middleware
  app.use(morgan("combined"))
  app.use(bodyParser())

  // Public Routes
  app.use(auth.routes()).use(auth.allowedMethods())
  // Private Routes
  // app.use(authMiddleware)
  app.use(user.routes()).use(user.allowedMethods())
  app.use(broker.routes()).use(broker.allowedMethods())

  // Error Handling
  app.silent = config.env !== "development"

  const db = await connectDb()
  const server = app.listen(port)

  const shutdown = async () => {
    await disconnectDb(db)
    server.close()
  }

  return {
    server,
    shutdown,
  }
}
