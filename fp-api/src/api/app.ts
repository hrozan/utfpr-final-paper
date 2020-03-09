import createError from "http-errors"
import express, { Request, Response, NextFunction, ErrorRequestHandler } from "express"
import logger from "morgan"
import cors from "cors"
import routes from "./routes"

const app = express()

if (process.env.NODE_ENV !== "test") {
  app.use(logger("dev"))
}

app.use(cors())
app.use(express.json())
app.use(routes)

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

export default app
