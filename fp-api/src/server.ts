import http from "http"
import { AddressInfo } from "net"
import app from "./app"
import * as database from "./infra/database"

const port = normalizePort(process.env.PORT || "3000")
app.set("port", port)

const server = http.createServer(app)
server.listen(port)
server.on("error", onError)
server.on("listening", onListening)

database.connect().then()

function normalizePort(val: string) {
  const port = parseInt(val, 10)

  if (isNaN(port)) {
    // named pipe
    return val
  }

  if (port >= 0) {
    // port number
    return port
  }

  return false
}

function onError(error: any) {
  if (error.syscall !== "listen") {
    throw error
  }

  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges")
      process.exit(1)
      break
    case "EADDRINUSE":
      console.error(bind + " is already in use")
      process.exit(1)
      break
    default:
      throw error
  }
}

function onListening() {
  const addr = <AddressInfo>server.address()
  console.info(`Listening on: http://localhost:${addr.port}`)
}
