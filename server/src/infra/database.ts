import mongoose, { Mongoose } from "mongoose"
import { DATABASE_URI } from "./config"

const connectedState = 1
export default {
  async connect(): Promise<Mongoose> {
    const config = { useNewUrlParser: true, useUnifiedTopology: true }

    const database = await mongoose.connect(DATABASE_URI, config)
    console.log("💿 Database Connected Successfully")
    return database
  },
  async disconnect(): Promise<void> {
    return mongoose.connection.close()
  },
  isConnected() {
    return mongoose.connection.readyState === connectedState
  },
}
