import express, { Application } from "express"
import cors from "cors"
import morgan from "morgan"

export default (app: Application) => {
  app.use(cors())
  app.use(express.json())
  app.use(morgan("combined"))
}
