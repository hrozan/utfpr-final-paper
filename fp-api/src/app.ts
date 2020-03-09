
import express, { Request, Response, NextFunction, ErrorRequestHandler } from "express"
import logger from "morgan"
import cors from "cors"
import { loadRoutes } from "./infra/routes"

const app = express()

if (process.env.NODE_ENV !== "test") {
  app.use(logger("dev"))
}

app.use(cors())
app.use(express.json())

loadRoutes(app)


export default app
