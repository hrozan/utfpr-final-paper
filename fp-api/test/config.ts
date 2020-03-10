import mongoose from "mongoose"
import Global = NodeJS.Global

interface GlobalMongoDb extends Global {
  __MONGO_DB__: () => void
}

declare var global: GlobalMongoDb
import * as database from "../src/infra/database"

export async function connectDatabase() {
  console.log("")
  await database.connect()
  global["__MONGO_DB__"] = database.close
}

export async function closeDatabaseConnection() {
  await global["__MONGO_DB__"]()
  console.log("Close Database")
}
