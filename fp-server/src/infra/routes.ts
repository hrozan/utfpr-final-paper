import { Application, Response } from "express"
import userRoutes from "../domain/user"
import { API_BASE_PATH } from "./config"

export default (app: Application) => {
  app.get("/", (_, res: Response) => res.json({ status: "ok" }))
  app.use(API_BASE_PATH, userRoutes)
}
