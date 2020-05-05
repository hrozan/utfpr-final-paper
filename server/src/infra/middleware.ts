import Koa from "koa"
import morgan from "koa-morgan"
import bodyParser from "koa-bodyparser"

export default (app: Koa) => {
  app.use(morgan("combined"))
  app.use(bodyParser())
}
