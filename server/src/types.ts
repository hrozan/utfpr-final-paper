import { Server } from "http"
import { BaseContext } from "koa"
import Database from "./infra/database"

export interface App {
  server: Server
  shutdown: () => Promise<void>
}

declare module "koa" {
  interface BaseContext {
    database: Database
  }
}
