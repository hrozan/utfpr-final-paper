import { run } from "./app"
import { PORT } from "./infra/config"

run(PORT)
  .then((app) => {
    if (app.dbIsConnected) {
      console.log("Database is Connected")
    }
    console.log(`Application running on: http://localhost:${PORT}`)
    // Graceful Shutdown
    const shutdown = async () => await app.shutdown()
    process.on("SIGTERM", shutdown)
    process.on("SIGINT", shutdown)
  })
  .catch((err) => console.error(err.message))
