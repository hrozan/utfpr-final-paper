import Debug from "debug"
import mongoose, {Mongoose} from "mongoose"
import {DATABASE_URI} from "../config"

const debug = Debug("app:database")

export type Db = {
  mongoose: Mongoose
  isConnected: boolean
}

const connectedState = 1

export const connectDb = async (): Promise<Db> => {
  const config = {useNewUrlParser: true, useUnifiedTopology: true}
  const database: Mongoose = await mongoose.connect(DATABASE_URI, config)
  debug("connected successfully")

  return {
    mongoose: database,
    isConnected: mongoose.connection.readyState === connectedState
  }
}

export const disconnectDb = async (db: Db): Promise<void> => {
  await db.mongoose.connection.close()
  debug("close successfully")
}


