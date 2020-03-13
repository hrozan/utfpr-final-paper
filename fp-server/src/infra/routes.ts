import { Application, Request, Response, NextFunction } from "express"
import createError from "http-errors"
import authRoutes from "../domain/auth/routes"
import userRoutes from "../domain/user/routes"
import smartObjectRoutes from "../domain/smartObject/routes"

function healthCheckHandler(request: Request, response: Response) {
  return response.json({ status: "ok" })
}

export function loadRoutes(app: Application) {
  // health check
  app.get("/", healthCheckHandler)
  app.use("/auth", authRoutes)
  app.use("/user", userRoutes)
  app.use("/mqtt", smartObjectRoutes)

  loadRoutesErrorHandlers(app)
}

function loadRoutesErrorHandlers(app: Application) {
  // catch 404 and forward to error handler
  app.use(function(req: Request, res: Response, next: NextFunction) {
    next(createError(404))
  })

  // error handler
  app.use(function(err: Error, req: Request, res: Response) {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get("env") === "development" ? err : {}

    // render the error page
    res.status(500)
    res.json({ message: "Error" })
  })
}
