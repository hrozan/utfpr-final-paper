import { run } from "./app"
import { PORT } from "./config"

run(PORT)
  .then((app) => {
    console.log(`🚀 Application Running On: http://localhost:${PORT}`)
    // Graceful Shutdown
    const shutdown = async () => {
      console.log("Shutdown")
      await app.shutdown()
    }
    process.on("SIGTERM", shutdown)
    process.on("SIGINT", shutdown)
  })
  .catch((err) => console.error(err.message))
