import { run, shutDown } from "./app"
import { PORT } from "./infra/config"

run(PORT)
  .then((app) => {
    console.log(`Server running on: http://localhost:${PORT}`)

    if (app.database.isConnected()) {
      console.log(`Database Connected Successfully`)
    } else {
      console.error("Database Not Connected")
    }

    // Graceful Shutdown
    process.on("SIGTERM", shutDown(app))
    process.on("SIGINT", shutDown(app))
  })
  .catch((err) => console.error(err.message))
