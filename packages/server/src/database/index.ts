import Debug from "debug"
import mongoose, { Mongoose } from "mongoose"
import { config } from "../config"

const debug = Debug("app:database")

export type Db = {
  mongoose: Mongoose
  isConnected: boolean
}

const connectedState = 1

export const connect = async (): Promise<Db> => {
  const { databaseUri } = config
  const database = await mongoose.connect(databaseUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  debug("connected successfully")

  return {
    mongoose: database,
    isConnected: mongoose.connection.readyState === connectedState,
  }
}

export const disconnect = async (db: Db): Promise<void> => {
  await db.mongoose.connection.close()
  debug("close successfully")
}
