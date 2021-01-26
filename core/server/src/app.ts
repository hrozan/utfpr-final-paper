import Koa from "koa"
import { Server } from "http"
import { connectDb, disconnectDb } from "./infra/database"
import { config, Env } from "./config"
import morgan from "koa-morgan"
import bodyParser from "koa-bodyparser"
import authMiddleware from "./domain/auth/middleware"
import user from "./domain/user"
import auth from "./domain/auth"
import broker from "./domain/broker"
import Router from "koa-router"

export type App = {
  server: Server
  shutdown: () => Promise<void>
}

// Health Check
const rootRouter = new Router()
rootRouter.get("/", (ctx) => {
  ctx.body = { api: "up and running" }
})

export const start = async (port: number): Promise<App> => {
  const app = new Koa()

  // Middleware
  if (config.env !== Env.test) app.use(morgan("combined"))

  app.use(bodyParser())

  // Public Routes
  app.use(rootRouter.routes()).use(rootRouter.allowedMethods())
  app.use(auth.routes()).use(auth.allowedMethods())

  app.use(authMiddleware)
  // Private Routes
  app.use(user.routes()).use(user.allowedMethods())
  app.use(broker.routes()).use(broker.allowedMethods())

  // Error Handling
  app.silent = config.env !== Env.dev

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
