import Koa from "koa"
import morgan from "koa-morgan"
import bodyParser from "koa-bodyparser"
import { ENV } from "./config"

export default (app: Koa) => {
  if (ENV !== "test") {
    app.use(morgan("combined"))
  }
  app.use(bodyParser())
}
