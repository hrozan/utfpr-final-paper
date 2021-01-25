import Debug from "debug"
import { start } from "./app"
import { config } from "./config"

const debug = Debug("app")

start(config.port)
  .then((app) => {
    debug(`running on: http://localhost:${config.port}`)
    // Graceful Shutdown
    const shutdown = async () => {
      debug("shutdown")
      await app.shutdown()
    }
    process.on("SIGTERM", shutdown)
    process.on("SIGINT", shutdown)
  })
  .catch((err) => console.error(err.message))
